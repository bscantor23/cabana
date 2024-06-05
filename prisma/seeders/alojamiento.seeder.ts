import { Faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { USUARIO_ID } from '../constants/roles';

const QUANTITY = 500;

export const alojamientoSeeder = async (prisma: PrismaClient, faker: Faker) => {
  let generateds = [];

  let [propietarios, tiposAlojamientos, centrosPoblados] = await Promise.all([
    prisma.usuario.findMany({
      where: {
        id_rol: USUARIO_ID,
      },
    }),
    prisma.tipoAlojamiento.findMany(),
    prisma.centroPoblado.findMany(),
  ]);

  for (let i = 0; i < QUANTITY; i++) {
    generateds.push({
      id_propietario: faker.helpers.arrayElement(propietarios).id_usuario,
      id_tipo_alojamiento:
        faker.helpers.arrayElement(tiposAlojamientos).id_tipo_alojamiento,
      id_centro_poblado:
        faker.helpers.arrayElement(centrosPoblados).id_centro_poblado,
      titulo: faker.lorem.sentence(),
      descripcion: faker.lorem.paragraph(),
      direccion_fisica: faker.location.streetAddress(),
      valor_hospedaje: faker.number.float({
        min: 100000,
        max: 200000,
        fractionDigits: 0,
      }),
      cupo_persona: faker.number.int({ min: 1, max: 5 }),
      numero_habitaciones: faker.number.int({ min: 1, max: 5 }),
      numero_banos: faker.number.int({ min: 1, max: 3 }),
      tiene_calefaccion: faker.datatype.boolean(),
      permite_mascotas: faker.datatype.boolean(),
      fecha_creacion: faker.date.past({ refDate: '2023-01-01T00:00:00.000Z' }),
      fecha_actualizacion: faker.date.recent({
        refDate: '2024-01-01T00:00:00.000Z',
      }),
    });
  }

  await prisma.alojamiento.createMany({
    data: [...generateds],
  });
};
