import { PrismaClient } from '@prisma/client';
import { rolSeeder } from './seeders/rol.seeder';
import { tipoDocumentoSeeder } from './seeders/tipo-documento.seeder';
import { departamentoSeeder } from './seeders/departamento.seeder';
import { ciudadSeeder } from './seeders/ciudad.seeder';
import { barrioSeeder } from './seeders/barrio.seeder';
import { faker } from '@faker-js/faker/locale/es';
import { tipoAlojamientoSeeder } from './seeders/tipo-alojamiento.seeder';
import { tipoPagoSeeder } from './seeders/tipo-pago.seeder';
import { usuarioSeeder } from './seeders/usuario.seeder';
import { paisSeeder } from './seeders/pais.seeder';

const prisma = new PrismaClient();

const main = async () => {
  //Clear Database
  await clearDatabase();

  //Generate Data
  await rolSeeder(prisma);
  await tipoAlojamientoSeeder(prisma);
  await tipoPagoSeeder(prisma);
  await tipoDocumentoSeeder(prisma);
  await paisSeeder(prisma);
  await departamentoSeeder(prisma);
  await ciudadSeeder(prisma);
  await barrioSeeder(prisma, faker);
  await usuarioSeeder(prisma, faker);
};

async function clearDatabase() {
  await prisma.barrio.deleteMany();
  await prisma.ciudad.deleteMany();
  await prisma.departamento.deleteMany();
  await prisma.usuario.deleteMany();
  await prisma.rol.deleteMany();
  await prisma.tipoDocumento.deleteMany();
  await prisma.tipoAlojamiento.deleteMany();
  await prisma.tipoPago.deleteMany();
  await prisma.pais.deleteMany();

  console.log('Database Cleared!');
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
