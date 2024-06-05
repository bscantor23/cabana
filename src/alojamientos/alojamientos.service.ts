import { HttpException, Injectable } from '@nestjs/common';
import { CreateAlojamientoDto } from './dto/create-alojamiento.dto';
import { UpdateAlojamientoDto } from './dto/update-alojamiento.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import alojamientosMapper from './mappers/alojamientos.mapper';
import { excludeFromObject } from 'src/utils/excludes.utils';
import { targetModulesByContainer } from '@nestjs/core/router/router-module';

@Injectable()
export class AlojamientosService {
  constructor(private prisma: PrismaService) {}

  async create(createAlojamientoDto: CreateAlojamientoDto) {
    let result = await this.prisma.alojamiento.create({
      data: alojamientosMapper.toCreatePersistence(createAlojamientoDto),
    });

    return result;
  }

  async search(searchDto: Prisma.AlojamientoFindManyArgs) {
    try {
      searchDto.include = {
        centro_poblado: {
          include: {
            ciudad: {
              include: {
                departamento: true,
              },
            },
          },
        },
        propietario: {
          select: {
            id_usuario: true,
            primer_nombre: true,
            primer_apellido: true,
            telefonos: true,
          },
        },
        reservas: {
          select: {
            fecha_inicio: true,
            fecha_fin: true,
            encuesta: true,
          },
        },
        tipo_alojamiento: true,
        fotografias: true,
      };

      let results = await this.prisma.alojamiento.findMany(searchDto);
      return results;
    } catch (e) {
      console.log(e);
      throw new HttpException('InvalidSearch', 400);
    }
  }

  async findOne(id_alojamiento: number) {
    let alojamiento = await this.prisma.alojamiento.findUnique({
      include: {
        centro_poblado: {
          include: {
            ciudad: {
              include: {
                departamento: true,
              },
            },
          },
        },
        propietario: {
          select: {
            id_usuario: true,
            primer_nombre: true,
            primer_apellido: true,
            telefonos: true,
          },
        },
        reservas: {
          select: {
            arrendatario: true,
            fecha_inicio: true,
            fecha_fin: true,
            encuesta: true,
          },
        },
        tipo_alojamiento: true,
        fotografias: true,
      },
      where: {
        id_alojamiento,
      },
    });

    if (!alojamiento) {
      return null;
    }

    return excludeFromObject(alojamiento, [
      'id_tipo_alojamiento',
      'id_centro_poblado',
    ]);
  }

  async update(
    id_alojamiento: number,
    updateAlojamientoDto: UpdateAlojamientoDto,
  ) {
    if (updateAlojamientoDto.fotografias) {
      await this.prisma.fotografiaAlojamiento.deleteMany({
        where: { id_alojamiento },
      });
    }

    return this.prisma.alojamiento.update({
      where: { id_alojamiento },
      data: alojamientosMapper.toUpdatePersistence(
        id_alojamiento,
        updateAlojamientoDto,
      ),
    });
  }

  async remove(id_alojamiento: number) {
    await this.prisma.fotografiaAlojamiento.deleteMany({
      where: { id_alojamiento },
    });

    return this.prisma.alojamiento.delete({
      where: { id_alojamiento },
    });
  }

  checkAlojamiento(id_alojamiento: number) {
    if (!id_alojamiento) {
      return null;
    }

    return this.prisma.alojamiento.findUnique({
      where: {
        id_alojamiento,
      },
    });
  }

  checkPropietario(id_usuario: string) {
    if (!id_usuario) {
      return null;
    }

    return this.prisma.usuario.findUnique({
      where: {
        id_usuario,
      },
    });
  }

  checkTipoAlojamiento(id_tipo_alojamiento: number) {
    if (!id_tipo_alojamiento) {
      return null;
    }

    return this.prisma.tipoAlojamiento.findUnique({
      where: {
        id_tipo_alojamiento,
      },
    });
  }

  checkCentroPoblado(id_centro_poblado: number) {
    if (!id_centro_poblado) {
      return null;
    }

    return this.prisma.centroPoblado.findUnique({
      where: {
        id_centro_poblado,
      },
    });
  }

  checkReservas(id_alojamiento: number) {
    if (!id_alojamiento) {
      return null;
    }

    return this.prisma.reserva.findMany({
      where: {
        id_alojamiento,
      },
    });
  }
}
