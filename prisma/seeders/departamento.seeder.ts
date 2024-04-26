import { PrismaClient } from '@prisma/client';
import { departamentos } from '../constants/departamentos';

export const departamentoSeeder = async (prisma: PrismaClient) => {
  await prisma.departamento.createMany({
    data: departamentos,
  });
};
