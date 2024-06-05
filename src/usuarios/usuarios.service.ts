import { HttpException, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { hash } from 'bcrypt';
import usuariosMapper from './mappers/usuarios.mapper';
import { excludeFromList, excludeFromObject } from 'src/utils/excludes.utils';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const { clave } = createUsuarioDto;
    const plainToHash = await hash(clave, 10);
    createUsuarioDto.clave = plainToHash;

    return this.prisma.usuario.create({
      data: usuariosMapper.toCreatePersistence(createUsuarioDto),
    });
  }

  async search(searchDto: Prisma.UsuarioFindManyArgs) {
    try {
      searchDto.include = {
        telefonos: true,
        tipo_documento: true,
        rol: true,
        pais: true,
      };

      let results = await this.prisma.usuario.findMany(searchDto);
      return results;
    } catch (e) {
      console.log(e);
      throw new HttpException('InvalidSearch', 400);
    }
  }

  async findOne(id_usuario: string) {
    let usuario = await this.prisma.usuario.findUnique({
      include: {
        telefonos: true,
        tipo_documento: true,
        rol: true,
        pais: true,
      },
      where: { id_usuario },
    });

    if (!usuario) {
      return null;
    }

    return excludeFromObject(usuario, [
      'clave',
      'id_rol',
      'id_pais',
      'id_tipo_documento',
    ]);
  }

  async update(id_usuario: string, updateUsuarioDto: UpdateUsuarioDto) {
    if (updateUsuarioDto.telefonos) {
      await this.prisma.usuarioTelefono.deleteMany({
        where: { id_usuario },
      });
    }

    return this.prisma.usuario.update({
      where: { id_usuario },
      data: usuariosMapper.toUpdatePersistence(updateUsuarioDto),
    });
  }

  async remove(id_usuario: string) {
    await this.prisma.usuarioTelefono.deleteMany({
      where: { id_usuario },
    });

    return this.prisma.usuario.delete({
      where: { id_usuario },
    });
  }

  async checkUsuario(id_usuario: string) {
    if (!id_usuario) {
      return null;
    }

    let result = await this.prisma.usuario.findUnique({
      where: {
        id_usuario,
      },
    });

    return result
  }

  checkCorreoElectronico(correo_electronico: string) {
    if (!correo_electronico) {
      return null;
    }

    return this.prisma.usuario.findUnique({
      where: {
        correo_electronico,
      },
    });
  }

  checkRol(id_rol: number) {
    if (!id_rol) {
      return null;
    }

    return this.prisma.rol.findUnique({
      where: {
        id_rol,
      },
    });
  }

  checkTipoDocumento(id_tipo_documento: number) {
    if (!id_tipo_documento) {
      return null;
    }

    return this.prisma.tipoDocumento.findUnique({
      where: {
        id_tipo_documento,
      },
    });
  }

  checkPais(id_pais: number) {
    if (!id_pais) {
      return null;
    }

    return this.prisma.pais.findUnique({
      where: {
        id_pais,
      },
    });
  }

  checkAlojamientos(id_usuario: string) {
    if (!id_usuario) {
      return null;
    }

    return this.prisma.alojamiento.findMany({
      where: {
        id_propietario: id_usuario,
      },
    });
  }

  checkReservas(id_usuario: string) {
    if (!id_usuario) {
      return null;
    }

    return this.prisma.reserva.findMany({
      where: {
        id_arrendatario: id_usuario,
      },
    });
  }
}
