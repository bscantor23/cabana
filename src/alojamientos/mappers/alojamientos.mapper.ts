import { Prisma } from '@prisma/client';
import { CreateAlojamientoDto } from '../dto/create-alojamiento.dto';
import { UpdateAlojamientoDto } from '../dto/update-alojamiento.dto';

const alojamientosMapper = {
  toCreatePersistence(
    alojamiento: CreateAlojamientoDto,
  ): Prisma.AlojamientoUncheckedCreateInput {
    let fotografias;
    if (alojamiento.fotografias && alojamiento.fotografias.length > 0) {
      fotografias = {
        createMany: {
          data: alojamiento.fotografias.map((_) => {
            return {
              descripcion: _.descripcion,
              uri: _.uri,
            };
          }),
        },
      };
    }

    return {
      ...alojamiento,
      fotografias,
    };
  },
  toUpdatePersistence(
    id_alojamiento: number,
    alojamiento: UpdateAlojamientoDto,
  ): Prisma.AlojamientoUncheckedUpdateInput {
    let fotografias;
    if (alojamiento.fotografias && alojamiento.fotografias.length > 0) {
      fotografias = {
        createMany: {
          data: alojamiento.fotografias.map((_) => {
            return {
              descripcion: _.descripcion,
              uri: _.uri,
            };
          }),
        },
      };
    }

    return {
      ...alojamiento,
      fotografias,
    };
  },
};

export default alojamientosMapper;
