import { HttpException, Injectable } from '@nestjs/common';
import { CreateDetalleDto, CreateReservaDto } from './dto/create-reserva.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateEncuestaDto } from './dto/create-encuesta.dto';
import reservasMapper from './mappers/reservas.mapper';
import { ROLES } from 'src/constants/roles';

@Injectable()
export class ReservasService {
  constructor(private prisma: PrismaService) {}

  async create(
    id_arrendatario: string,
    createReservaDto: CreateReservaDto,
    detallesDto: CreateDetalleDto[],
  ) {
    let result = await this.prisma.reserva.create({
      data: reservasMapper.toCreatePersistence(
        id_arrendatario,
        createReservaDto,
        detallesDto,
      ),
    });

    return result;
  }

  async search(searchDto: Prisma.ReservaFindManyArgs) {
    try {
      searchDto.include = {
        alojamiento: {
          include: {
            centro_poblado: true,
            propietario: true
          },
        },
        pagos: true,
        arrendatario: true,
        encuesta: true,
        detalles: true,
      };

      let results = await this.prisma.reserva.findMany(searchDto);
      return results;
    } catch (e) {
      console.log(e);
      throw new HttpException('InvalidSearch', 400);
    }
  }

  async survey(id_reserva: number, surveyDto: CreateEncuestaDto) {
    let result = await this.prisma.encuestaReserva.create({
      data: { id_reserva, ...surveyDto },
    });

    return result;
  }

  async findOne(id_reserva: number, user: { sub: string; role: number }) {
    let access;

    if (user.role === ROLES.USUARIO) {
      access = {
        OR: [
          {
            arrendatario: {
              id_usuario: user.sub,
            },
          },
          {
            alojamiento: {
              propietario: {
                id_usuario: user.sub,
              },
            },
          },
        ],
      };
    }

    let reserva = await this.prisma.reserva.findUnique({
      include: {
        alojamiento: true,
        pagos: true,
        encuesta: true,
        detalles: true,
      },
      where: {
        id_reserva,
        ...access,
      },
    });

    return reserva;
  }

  async getTemporadas() {
    let result = await this.prisma.temporada.findMany();
    return result;
  }

  async checkReserva(id_reserva: number, id_usuario?: string) {
    if (!id_reserva) {
      return null;
    }

    let where = {
      id_reserva,
      id_arrendatario: id_usuario,
    };

    if (!id_usuario) {
      delete where.id_arrendatario;
    }

    let result = await this.prisma.reserva.findFirst({
      where,
    });

    if (!result) {
      return null;
    }

    return result;
  }

  checkAlojamiento(id_alojamiento: number) {
    if (!id_alojamiento) {
      return null;
    }

    return this.prisma.alojamiento.findUnique({
      where: {
        id_alojamiento,
        activo: true,
      },
    });
  }

  async checkDisponibilidad(
    id_alojamiento: number,
    fecha_inicio: Date,
    fecha_fin: Date,
  ) {
    let results = await this.prisma.reserva.findFirst({
      where: {
        id_alojamiento,
        OR: [
          {
            fecha_inicio: {
              gte: fecha_inicio,
              lte: fecha_fin,
            },
          },
          {
            fecha_fin: {
              gte: fecha_inicio,
              lte: fecha_fin,
            },
          },
        ],
      },
    });

    return results;
  }

  checkEncuesta(id_reserva: number) {
    if (!id_reserva) {
      return null;
    }

    return this.prisma.encuestaReserva.findFirst({
      where: {
        id_reserva,
      },
    });
  }

  checkArrendatario(id_usuario: string) {
    if (!id_usuario) {
      return null;
    }

    return this.prisma.usuario.findUnique({
      where: {
        id_usuario,
      },
    });
  }
}
