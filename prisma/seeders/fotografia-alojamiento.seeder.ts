import { Faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { HttpService } from '@nestjs/axios';
import { CABANA_ID } from '../constants/tipos-alojamiento';
import { firstValueFrom } from 'rxjs';

export const fotografiaAlojamientoSeeder = async (
  prisma: PrismaClient,
  faker: Faker,
  httpService: HttpService,
) => {
  let generateds = [];

  const headers = {
    Authorization: process.env.PEXELS_API_KEY,
  };

  let [alojamientos, casasImagenes, cabanasImagenes] = await Promise.all([
    prisma.alojamiento.findMany({}),
    firstValueFrom(
      httpService.get(process.env.PEXELS_API_URL_HOUSE, {
        headers,
      }),
    ),
    firstValueFrom(
      httpService.get(process.env.PEXELS_API_URL_CABIN, {
        headers,
      }),
    ),
  ]);

  let casas = casasImagenes.data.photos;
  let cabanas = cabanasImagenes.data.photos;

  alojamientos.forEach((alojamiento) => {
    let random = faker.number.int({
      min: 1,
      max: 5,
    });

    for (let i = 0; i < random; i++) {
      let imagen: any = faker.helpers.arrayElement(
        alojamiento.id_tipo_alojamiento == CABANA_ID ? cabanas : casas,
      );

      generateds.push({
        id_alojamiento: alojamiento.id_alojamiento,
        descripcion: faker.lorem.paragraph({ min: 1, max: 5 }),
        uri: imagen.src.original,
      });
    }
  });

  await prisma.fotografiaAlojamiento.createMany({
    data: [...generateds],
  });
};
