import { Faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

export const encuestaReservasSeeder = async (
  prisma: PrismaClient,
  faker: Faker,
) => {
  let generateds = [];

  let reservasPagadas = await prisma.reserva.findMany();
  reservasPagadas.forEach((reservaPagada) => {
    if (
      Number(reservaPagada.valor_hospedaje) ==
      Number(reservaPagada.valor_cancelado)
    ) {
      generateds.push({
        id_reserva: reservaPagada.id_reserva,
        calificacion: faker.number.int({ min: 1, max: 5 }),
        comentario: faker.lorem.paragraph({ min: 1, max: 5 }),
        fecha_creacion: faker.date.past({
          refDate: '2023-01-01T00:00:00.000Z',
        }),
        fecha_actualizacion: faker.date.recent({
          refDate: '2024-01-01T00:00:00.000Z',
        }),
      });
    }
  });

  await prisma.encuestaReserva.createMany({
    data: [...generateds],
  });
};
