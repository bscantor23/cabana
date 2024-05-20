import { Faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

export const usuarioTelefonoSeeder = async (
  prisma: PrismaClient,
  faker: Faker,
) => {
  let generateds = [];

  let usuarios = await prisma.usuario.findMany();

  usuarios.forEach((usuario) => {
    let random = faker.number.int({
      min: 1,
      max: 3,
    });

    for (let i = 0; i < random; i++) {
      generateds.push({
        id_usuario: usuario.id_usuario,
        telefono: faker.phone.number(),
        fecha_creacion: faker.date.past({
          refDate: '2023-01-01T00:00:00.000Z',
        }),
        fecha_actualizacion: faker.date.recent({
          refDate: '2024-01-01T00:00:00.000Z',
        }),
      });
    }
  });

  await prisma.usuarioTelefono.createMany({
    data: [...generateds],
  });
};
