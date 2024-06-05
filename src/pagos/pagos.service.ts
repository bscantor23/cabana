import { HttpException, Injectable } from '@nestjs/common';
import { CreatePagoDto } from './dto/create-pago.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { excludeFromObject } from 'src/utils/excludes.utils';

@Injectable()
export class PagosService {
  constructor(private prisma: PrismaService) {}

  async create(createPagoDto: CreatePagoDto) {
    let result = await this.prisma.pagoReserva.create({
      data: {
        ...createPagoDto,
        fecha_historico: new Date(createPagoDto.fecha_historico),
      },
    });

    return result;
  }

  async search(searchDto: Prisma.PagoReservaFindManyArgs) {
    try {
      searchDto.include = {
        reserva: true,
        tipo_pago: true,
      };

      return this.prisma.pagoReserva.findMany(searchDto);
    } catch (e) {
      console.log(e);
      throw new HttpException('InvalidSearch', 400);
    }
  }

  async searchByReserva(
    id_reserva: number,
    searchDto: Prisma.PagoReservaFindManyArgs,
  ) {
    try {
      searchDto.include = {
        reserva: true,
        tipo_pago: true,
      };

      searchDto.where = {
        ...searchDto.where,
        id_reserva,
      };

      return this.prisma.pagoReserva.findMany(searchDto);
    } catch (e) {
      console.log(e);
      throw new HttpException('InvalidSearch', 400);
    }
  }

  async findOne(id_pago_reserva: number) {
    let pagoReserva = await this.prisma.pagoReserva.findUnique({
      include: {
        reserva: true,
        tipo_pago: true,
      },
      where: {
        id_pago_reserva,
      },
    });

    if (!pagoReserva) {
      return null;
    }

    return excludeFromObject(pagoReserva, ['id_reserva', 'id_tipo_pago']);
  }

  checkPagoReserva(id_pago_reserva: number) {
    if (!id_pago_reserva) {
      return null;
    }

    return this.prisma.pagoReserva.findUnique({
      where: {
        id_pago_reserva,
      },
    });
  }

  async checkReserva(id_reserva: number, id_usuario: string) {
    if (!id_reserva) {
      return null;
    }

    let result = await this.prisma.reserva.findFirst({
      where: {
        id_reserva,
        OR: [
          {
            arrendatario: {
              id_usuario,
            },
          },
          {
            alojamiento: {
              propietario: {
                id_usuario,
              },
            },
          },
        ],
      },
    });

    if (!result) {
      return null;
    }

    return {
      ...result,
      valor_cancelado: result.valor_cancelado.toNumber(),
      valor_hospedaje: result.valor_hospedaje.toNumber(),
    };
  }

  checkTipoPago(id_tipo_pago: number) {
    if (!id_tipo_pago) {
      return null;
    }

    return this.prisma.tipoPago.findUnique({
      where: {
        id_tipo_pago,
      },
    });
  }
}
