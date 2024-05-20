import { Faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { centrosPoblados } from '../constants/centros-poblados';
import { BOGOTA_ID, MEDELLIN_ID } from '../constants/ciudades';

export const centroPobladoSeeder = async (
  prisma: PrismaClient,
  faker: Faker,
) => {
  let generateds = [];

  let ciudades = await prisma.ciudad.findMany({
    where: {
      id_ciudad: {
        notIn: [BOGOTA_ID, MEDELLIN_ID],
      },
    },
  });

  ciudades.forEach((ciudad) => {
    let random = faker.number.int({
      min: 1,
      max: 10,
    });

    for (let i = 0; i < random; i++) {
      centrosPoblados.push({
        id_ciudad: ciudad.id_ciudad,
        nombre: faker.location.city(),
      });
    }
  });

  await prisma.centroPoblado.createMany({
    data: [...generateds, ...centrosPoblados],
  });
};
