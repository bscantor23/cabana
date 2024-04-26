import { PrismaClient } from '@prisma/client';
import { roles } from '../constants/roles';

export const rolSeeder = async (prisma: PrismaClient) => {
  await prisma.rol.createMany({
    data: roles,
  });
};
