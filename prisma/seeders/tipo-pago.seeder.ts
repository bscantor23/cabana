import { PrismaClient } from '@prisma/client';
import { tiposPagos } from '../constants/tipos-pago';

export const tipoPagoSeeder = async (prisma: PrismaClient) => {
  await prisma.tipoPago.createMany({
    data: tiposPagos,
  });
};
