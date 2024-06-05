import { Prisma } from '@prisma/client';
import { CreateDetalleDto, CreateReservaDto } from '../dto/create-reserva.dto';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import * as isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(utc);

const reservasMapper = {
  toCreatePersistence(
    id_arrendatario: string,
    reserva: CreateReservaDto,
    detallesReserva: CreateDetalleDto[],
  ): Prisma.ReservaUncheckedCreateInput {
    let detalles;

    if (detallesReserva && detallesReserva.length > 0) {
      detalles = {
        createMany: {
          data: detallesReserva,
        },
      };
    }

    return {
      ...reserva,
      fecha_inicio: dayjs.utc(reserva.fecha_inicio, 'YYYY-MM-DD').toDate(),
      fecha_fin: dayjs.utc(reserva.fecha_fin, 'YYYY-MM-DD').toDate(),
      id_arrendatario,
      detalles,
    };
  },
};

export default reservasMapper;
