import { PrismaClient } from '@prisma/client';
import { temporadas } from '../constants/temporadas';

export const temporadaSeeder = async (prisma: PrismaClient) => {
  await prisma.temporada.createMany({
    data: temporadas,
  });
};
