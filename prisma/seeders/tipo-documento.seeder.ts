import { PrismaClient } from '@prisma/client';
import { tiposDocumentos } from '../constants/tipos-documento';

export const tipoDocumentoSeeder = async (prisma: PrismaClient) => {
  await prisma.tipoDocumento.createMany({
    data: tiposDocumentos,
  });
};
