import { Faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import * as isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(utc);

export const reservaDetalleSeeder = async (
  prisma: PrismaClient,
  faker: Faker,
) => {
  let generateds = [];

  let [reservas, temporadas] = await Promise.all([
    prisma.reserva.findMany({
      include: {
        alojamiento: true,
      },
    }),
    prisma.temporada.findMany(),
  ]);

  reservas.forEach((reserva) => {
    let fecha_inicio = dayjs.utc(reserva.fecha_inicio, 'YYYY-MM-DD');
    let fecha_fin = dayjs.utc(reserva.fecha_fin, 'YYYY-MM-DD');
    let differenceInDays = fecha_fin.diff(fecha_inicio, 'day');

    for (let i = 0; i <= differenceInDays; i++) {
      let fecha = fecha_inicio.add(i, 'day');

      let temporada = temporadas.find(
        (_) =>
          fecha.isSameOrAfter(_.fecha_inicio) &&
          fecha.isSameOrBefore(_.fecha_fin),
      );

      let detail = generateds[generateds.length - 1];
      if (detail && !detail.id_temporada && temporada) {
        detail.fecha_fin = fecha_inicio.add(i - 1, 'day').toDate();
      }

      if (!detail || detail.fecha_fin) {
        let interes = temporada
          ? (Number(temporada.porcentaje) / 100) *
            Number(reserva.alojamiento.valor_hospedaje)
          : 0.1 * Number(reserva.alojamiento.valor_hospedaje);

        interes = Number(interes.toFixed(2));

        let valor_unitario =
          interes + Number(reserva.alojamiento.valor_hospedaje);

        generateds.push({
          id_reserva: reserva.id_reserva,
          id_temporada: temporada?.id_temporada || null,
          fecha_inicio: fecha.toDate(),
          fecha_fin: null,
          interes,
          valor_unitario,
          cantidad_dias: 0,
          valor_hospedaje: 0,
          fecha_creacion: faker.date.past({
            refDate: '2023-01-01T00:00:00.000Z',
          }),
          fecha_actualizacion: faker.date.recent({
            refDate: '2024-01-01T00:00:00.000Z',
          }),
        });

        detail = generateds[generateds.length - 1];
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
          detail.valor_unitario * reserva.numero_personas
        ).toFixed(2),
      );

      detail.cantidad_dias += 1;
    }
  });

  await prisma.reservaDetalle.createMany({
    data: [...generateds],
  });
};
