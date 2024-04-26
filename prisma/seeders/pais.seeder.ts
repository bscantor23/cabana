import { PrismaClient } from '@prisma/client';
import { paises } from '../constants/paises';

export const paisSeeder = async (prisma: PrismaClient) => {
  await prisma.pais.createMany({
    data: paises,
  });
};
