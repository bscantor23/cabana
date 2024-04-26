import { Faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import { COLOMBIA_ID } from '../constants/paises';
import { usuarios } from '../constants/usuarios';

export const usuarioSeeder = async (prisma: PrismaClient, faker: Faker) => {
  let generateds = [];

  let [roles, tiposDocumento] = await Promise.all([
    prisma.rol.findMany(),
    prisma.tipoDocumento.findMany(),
  ]);

  let freePassword = await hash(process.env.FREE_PASSWORD, 10);

  let predefineds = usuarios.map((usuario) => {
    return {
      ...usuario,
      id_tipo_documento:
        faker.helpers.arrayElement(tiposDocumento).id_tipo_documento,
      id_pais: COLOMBIA_ID,
      numero_identificacion: faker.string.numeric(20),
      clave: freePassword,
      primer_nombre: faker.person.firstName(),
      segundo_nombre: faker.person.firstName(),
      primer_apellido: faker.person.middleName(),
      segundo_apellido: faker.person.middleName(),
      direccion_residencia: faker.location.streetAddress(),
      created_at: faker.date.past({ refDate: '2023-01-01T00:00:00.000Z' }),
      updated_at: faker.date.recent({ refDate: '2024-01-01T00:00:00.000Z' }),
    };
  });

  for (let i = 0; i < 20; i++) {
    let password = await hash(faker.internet.password(), 10);
    generateds.push({
      id_rol: faker.helpers.arrayElement(roles).id_rol,
      id_tipo_documento:
        faker.helpers.arrayElement(tiposDocumento).id_tipo_documento,
      id_pais: COLOMBIA_ID,
      numero_identificacion: faker.string.numeric(20),
      correo_electronico: faker.internet.email(),
      clave: password,
      primer_nombre: faker.person.firstName(),
      segundo_nombre: faker.person.firstName(),
      primer_apellido: faker.person.middleName(),
      segundo_apellido: faker.person.middleName(),
      direccion_residencia: faker.location.streetAddress(),
      created_at: faker.date.past({ refDate: '2023-01-01T00:00:00.000Z' }),
      updated_at: faker.date.recent({ refDate: '2024-01-01T00:00:00.000Z' }),
    });
  }

  await prisma.usuario.createMany({
    data: [...predefineds, ...generateds],
  });
};