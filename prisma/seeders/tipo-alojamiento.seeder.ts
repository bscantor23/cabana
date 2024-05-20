import { PrismaClient } from '@prisma/client';
import { tiposAlojamientos } from '../constants/tipos-alojamiento';

export const tipoAlojamientoSeeder = async (prisma: PrismaClient) => {
  await prisma.tipoAlojamiento.createMany({
    data: tiposAlojamientos,
  });
};
