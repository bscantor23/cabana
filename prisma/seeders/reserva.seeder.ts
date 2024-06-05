import { Faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { USUARIO_ID } from '../constants/roles';
import * as dayjs from 'dayjs';

export const reservaSeeder = async (prisma: PrismaClient, faker: Faker) => {
  let generateds = [];

  let [alojamientos, arrendatarios] = await Promise.all([
    prisma.alojamiento.findMany(),
    prisma.usuario.findMany({
      where: {
        id_rol: USUARIO_ID,
      },
    }),
  ]);

  alojamientos.forEach((alojamiento) => {
    let random = faker.number.int({
      min: 1,
      max: 3,
    });

    for (let i = 0; i < random; i++) {
      let arrendatario = faker.helpers.arrayElement(arrendatarios);
      let fecha_inicio = faker.date.between({
        from: '2024-01-01',
        to: '2024-12-31',
      });

      let quantityDays = faker.number.int({
        min: 1,
        max: 10,
      });

      const fecha_fin = dayjs(fecha_inicio).add(quantityDays, 'day').toDate();

      generateds.push({
        id_alojamiento: alojamiento.id_alojamiento,
        id_arrendatario: arrendatario.id_usuario,
        numero_personas: faker.number.int({
          min: 1,
          max: alojamiento.cupo_persona,
        }),
        incluye_mascotas: faker.datatype.boolean(),
        fecha_inicio,
        fecha_fin,
        fecha_creacion: faker.date.past({
          refDate: '2023-01-01T00:00:00.000Z',
        }),
        fecha_actualizacion: faker.date.recent({
          refDate: '2024-01-01T00:00:00.000Z',
        }),
      });
    }
  });

  await prisma.reserva.createMany({
    data: [...generateds],
  });
};
