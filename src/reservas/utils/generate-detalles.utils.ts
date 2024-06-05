import { Prisma } from '@prisma/client';
import { CreateDetalleDto, CreateReservaDto } from '../dto/create-reserva.dto';

import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import * as isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(utc);

export const generateDetalles = (
  createReservaDto: CreateReservaDto,
  temporadas: any,
  alojamiento: any,
): CreateDetalleDto[] => {
  let detalles: CreateDetalleDto[] = [];

  let fecha_inicio = dayjs.utc(createReservaDto.fecha_inicio, 'YYYY-MM-DD');
  let fecha_fin = dayjs.utc(createReservaDto.fecha_fin, 'YYYY-MM-DD');
  let differenceInDays = fecha_fin.diff(fecha_inicio, 'day');

  for (let i = 0; i <= differenceInDays; i++) {
    let fecha = fecha_inicio.add(i, 'day');

    let temporada = temporadas.find(
      (_) =>
        fecha.isSameOrAfter(_.fecha_inicio) &&
        fecha.isSameOrBefore(_.fecha_fin),
    );

    let detail = detalles[detalles.length - 1];
    if (detail && !detail.id_temporada && temporada) {
      detail.fecha_fin = fecha_inicio.add(i - 1, 'day').toDate();
    }

    if (!detail || detail.fecha_fin) {
      let interes = temporada
        ? (Number(temporada.porcentaje) / 100) *
          Number(alojamiento.valor_hospedaje)
        : 0.1 * Number(alojamiento.valor_hospedaje);

      interes = Number(interes.toFixed(2));

      let valor_unitario = interes + Number(alojamiento.valor_hospedaje);

      detalles.push({
        id_temporada: temporada?.id_temporada || null,
        fecha_inicio: fecha.toDate(),
        fecha_fin: null,
        interes,
        valor_unitario,
        cantidad_dias: 0,
        valor_hospedaje: 0,
      });

      detail = detalles[detalles.length - 1];
    }

    if (temporada && fecha.isSame(temporada.fecha_fin)) {
      detail.fecha_fin = fecha.toDate();
    }

    if (i == differenceInDays) {
      detail.fecha_fin = fecha.toDate();
    }

    detail.valor_hospedaje = Number(
      (
        detail.valor_hospedaje +
        detail.valor_unitario * createReservaDto.numero_personas
      ).toFixed(2),
    );

    detail.cantidad_dias += 1;
  }

  return detalles;
};
