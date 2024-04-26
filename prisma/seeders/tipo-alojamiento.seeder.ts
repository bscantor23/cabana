import { PrismaClient } from '@prisma/client';
import { tiposAlojamiento } from '../constants/tipos-alojamiento';

export const tipoAlojamientoSeeder = async (prisma: PrismaClient) => {
  await prisma.tipoAlojamiento.createMany({
    data: tiposAlojamiento,
  });
};
