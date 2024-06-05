import { Prisma } from '@prisma/client';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';

const usuariosMapper = {
  toCreatePersistence(
    usuario: CreateUsuarioDto,
  ): Prisma.UsuarioUncheckedCreateInput {
    let telefonos;
    if (usuario.telefonos && usuario.telefonos.length > 0) {
      telefonos = {
        createMany: {
          data: usuario.telefonos.map((_) => {
            return {
              telefono: _,
            };
          }),
        },
      };
    }

    return {
      ...usuario,
      telefonos,
    };
  },
  toUpdatePersistence(
    usuario: UpdateUsuarioDto,
  ): Prisma.UsuarioUncheckedUpdateInput {
    let telefonos;
    if (usuario.telefonos && usuario.telefonos.length > 0) {
      telefonos = {
        createMany: {
          data: usuario.telefonos.map((_) => {
            return {
              telefono: _,
            };
          }),
        },
      };
    }

    return {
      ...usuario,
      telefonos,
    };
  },
};

export default usuariosMapper;
