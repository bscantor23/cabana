import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { SessionModify } from 'src/auth/decorators/session-modify.decorator';
import { UsuariosModuleGuard } from './guards/usuarios-module.guard';
import { AuthGuard } from '@nestjs/passport';
import { exists } from 'fs';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @Roles('ADMIN')
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    const [
      existsUsuario,
      existsEmail,
      existsRol,
      existsPais,
      existsTipoDocumento,
    ] = await Promise.all([
      this.usuariosService.checkUsuario(createUsuarioDto.id_usuario),
      this.usuariosService.checkCorreoElectronico(
        createUsuarioDto.correo_electronico,
      ),
      this.usuariosService.checkRol(createUsuarioDto.id_rol),
      this.usuariosService.checkPais(createUsuarioDto.id_pais),
      this.usuariosService.checkTipoDocumento(
        createUsuarioDto.id_tipo_documento,
      ),
    ]);

    if (!existsTipoDocumento) {
      throw new HttpException('TipoDocumentoNotFound', 404);
    }

    if (!existsRol) {
      throw new HttpException('RolNotFound', 404);
    }

    if (!existsPais) {
      throw new HttpException('PaisNotFound', 404);
    }

    if (existsUsuario) {
      throw new HttpException('UsuarioAlreadyExists', 400);
    }

    if (existsEmail) {
      throw new HttpException('CorreoElectronicoAlreadyExists', 400);
    }

    await this.usuariosService.create(createUsuarioDto);

    return { statusCode: 201, message: 'UsuarioCreated' };
  }

  @Post('/search')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @Roles('ADMIN')
  @HttpCode(200)
  async search(@Body() searchUsuarioDto: Prisma.UsuarioFindManyArgs) {
    if (searchUsuarioDto.include) {
      throw new HttpException('InvalidSearch', 400);
    }

    let result = await this.usuariosService.search(searchUsuarioDto);
    return result;
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard, UsuariosModuleGuard)
  @Roles('ADMIN', 'USUARIO')
  @SessionModify('ADMIN')
  async findOne(@Param('id') id_usuario: string) {
    const existsUsuario = await this.usuariosService.findOne(id_usuario);
    if (!existsUsuario) {
      throw new HttpException('UsuarioNotFound', 404);
    }

    return existsUsuario;
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard, UsuariosModuleGuard)
  @Roles('ADMIN', 'USUARIO')
  @SessionModify('ADMIN')
  async update(
    @Param('id') id_usuario: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    const existsUsuario = await this.usuariosService.checkUsuario(id_usuario);
    if (!existsUsuario) {
      throw new HttpException('UsuarioNotFound', 404);
    }

    if (updateUsuarioDto?.correo_electronico) {
      const existsEmail = await this.usuariosService.checkCorreoElectronico(
        updateUsuarioDto?.correo_electronico,
      );
      if (existsEmail && existsEmail.id_usuario !== id_usuario) {
        throw new HttpException('CorreoElectronicoAlreadyExists', 400);
      }
    }

    if (updateUsuarioDto?.id_tipo_documento) {
      const existsTipoDocumento = await this.usuariosService.checkTipoDocumento(
        updateUsuarioDto?.id_tipo_documento,
      );
      if (!existsTipoDocumento) {
        throw new HttpException('TipoDocumentoNotExists', 404);
      }
    }

    if (updateUsuarioDto?.id_pais) {
      const existsPais = await this.usuariosService.checkPais(
        updateUsuarioDto?.id_pais,
      );
      if (!existsPais) {
        throw new HttpException('PaisNotExists', 404);
      }
    }

    await this.usuariosService.update(id_usuario, updateUsuarioDto);
    return { statusCode: 200, message: 'UsuarioUpdated' };
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @Roles('ADMIN')
  async remove(@Param('id') id_usuario: string) {
    const existsUsuario = await this.usuariosService.checkUsuario(id_usuario);
    if (!existsUsuario) {
      throw new HttpException('UsuarioNotFound', 404);
    }

    const existsAlojamientos =
      await this.usuariosService.checkAlojamientos(id_usuario);
    if (existsAlojamientos && existsAlojamientos.length > 0) {
      throw new HttpException('AlojamientosCascadeDependency', 400);
    }

    const existsReservas = await this.usuariosService.checkReservas(id_usuario);
    if (existsReservas && existsReservas.length > 0) {
      throw new HttpException('ReservasCascadeDependency', 400);
    }

    await this.usuariosService.remove(id_usuario);

    return { statusCode: 200, message: 'UsuarioDeleted' };
  }
}
