import { Faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

export const pagoReservaSeeder = async (prisma: PrismaClient, faker: Faker) => {
  let generateds = [];

  let [reservas, tiposPagos] = await Promise.all([
    prisma.reserva.findMany(),
    prisma.tipoPago.findMany(),
  ]);

  reservas.forEach((reserva) => {
    let total = 0;
    while (total < Number(reserva.valor_hospedaje)) {
      let monto = faker.number.float({
        min: 100000,
        max: 2000000,
        fractionDigits: 0,
      });

      total += monto;

      if (total > Number(reserva.valor_hospedaje)) {
        monto = monto - (total - Number(reserva.valor_hospedaje));
      }

      if (faker.datatype.boolean()) {
        continue;
      }

      generateds.push({
        id_reserva: reserva.id_reserva,
        id_tipo_pago: faker.helpers.arrayElement(tiposPagos).id_tipo_pago,
        fecha_historico: faker.date.between({
          from: '2024-01-01',
          to: reserva.fecha_fin,
        }),
        valor_cancelado: Number(monto.toFixed(2)),
        fecha_creacion: faker.date.past({
          refDate: '2023-01-01T00:00:00.000Z',
        }),
        fecha_actualizacion: faker.date.recent({
          refDate: '2024-01-01T00:00:00.000Z',
        }),
      });
    }
  });

  await prisma.pagoReserva.createMany({
    data: [...generateds],
  });
};
