import { PrismaClient } from '@prisma/client';
import { ciudades } from '../constants/ciudades';

export const ciudadSeeder = async (prisma: PrismaClient) => {
  await prisma.ciudad.createMany({
    data: ciudades,
  });
};
