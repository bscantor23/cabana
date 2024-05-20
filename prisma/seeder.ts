import { PrismaClient } from '@prisma/client';
import { rolSeeder } from './seeders/rol.seeder';
import { tipoDocumentoSeeder } from './seeders/tipo-documento.seeder';
import { departamentoSeeder } from './seeders/departamento.seeder';
import { ciudadSeeder } from './seeders/ciudad.seeder';
import { centroPobladoSeeder } from './seeders/centro-poblado.seeder';
import { faker } from '@faker-js/faker/locale/es';
import { tipoAlojamientoSeeder } from './seeders/tipo-alojamiento.seeder';
import { tipoPagoSeeder } from './seeders/tipo-pago.seeder';
import { usuarioSeeder } from './seeders/usuario.seeder';
import { paisSeeder } from './seeders/pais.seeder';
import { tablasAutoincremental } from './constants/tablas-autoincremental';
import { usuarioTelefonoSeeder } from './seeders/usuario-telefono.seeder';
import { alojamientoSeeder } from './seeders/alojamiento.seeder';
import { HttpService } from '@nestjs/axios';
import { fotografiaAlojamientoSeeder } from './seeders/fotografia-alojamiento.seeder';
import { temporadaSeeder } from './seeders/temporada.seeder';
import { reservaSeeder } from './seeders/reserva.seeder';
import { reservaDetalleSeeder } from './seeders/reserva-detalle.seeder';
import { encuestaReservasSeeder } from './seeders/encuesta-reserva.seeder';
import { pagoReservaSeeder } from './seeders/pago-reserva.seeder';

const prisma = new PrismaClient();
const httpService = new HttpService();

const main = async () => {
  //Clear Database
  await clearDatabase();

  //Generate Data
  await rolSeeder(prisma);
  await tipoDocumentoSeeder(prisma);
  await paisSeeder(prisma);
  await usuarioSeeder(prisma, faker);
  await usuarioTelefonoSeeder(prisma, faker);
  await departamentoSeeder(prisma);
  await ciudadSeeder(prisma);
  await centroPobladoSeeder(prisma, faker);
  await tipoAlojamientoSeeder(prisma);
  await alojamientoSeeder(prisma, faker);
  await fotografiaAlojamientoSeeder(prisma, faker, httpService);
  await reservaSeeder(prisma, faker);
  await tipoPagoSeeder(prisma);
  await reservaDetalleSeeder(prisma, faker);
  await pagoReservaSeeder(prisma, faker);
  await encuestaReservasSeeder(prisma, faker);
  await temporadaSeeder(prisma);
};

async function clearDatabase() {
  await prisma.temporada.deleteMany();
  await prisma.encuestaReserva.deleteMany();
  await prisma.pagoReserva.deleteMany();
  await prisma.reservaDetalle.deleteMany();
  await prisma.tipoPago.deleteMany();
  await prisma.reserva.deleteMany();
  await prisma.fotografiaAlojamiento.deleteMany();
  await prisma.alojamiento.deleteMany();
  await prisma.tipoAlojamiento.deleteMany();
  await prisma.centroPoblado.deleteMany();
  await prisma.ciudad.deleteMany();
  await prisma.departamento.deleteMany();
  await prisma.usuarioTelefono.deleteMany();
  await prisma.usuario.deleteMany();
  await prisma.pais.deleteMany();
  await prisma.tipoDocumento.deleteMany();
  await prisma.rol.deleteMany();

  await resetAutoincremental();
}

async function resetAutoincremental() {
  let promises = [];
  tablasAutoincremental.forEach((tabla) => {
    promises.push(
      prisma.$executeRawUnsafe(
        `ALTER SEQUENCE ${tabla}_id_${tabla}_seq RESTART WITH 1`,
      ),
    );
  });

  await Promise.all(promises);
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
