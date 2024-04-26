import { PrismaClient } from '@prisma/client';
import { tiposPago } from '../constants/tipos-pago';

export const tipoPagoSeeder = async (prisma: PrismaClient) => {
  await prisma.tipoPago.createMany({
    data: tiposPago,
  });
};
