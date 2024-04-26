import { PrismaClient } from '@prisma/client';
import { tiposDocumento } from '../constants/tipos-documento';

export const tipoDocumentoSeeder = async (prisma: PrismaClient) => {
  await prisma.tipoDocumento.createMany({
    data: tiposDocumento,
  });
};
