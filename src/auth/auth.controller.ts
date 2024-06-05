import {
  Controller,
  Post,
  Body,
  HttpException,
  UseGuards,
  Request,
  Param,
  HttpCode,
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';
import { ROLES } from 'src/constants/roles';
import { AuthGuard } from '@nestjs/passport';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AuthModuleGuard } from './guards/auth-module.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usuariosService: UsuariosService,
  ) {}

  @Post('/login')
  @HttpCode(200)
  async login(@Body() loginAuthDto: LoginAuthDto) {
    let result = await this.authService.login(loginAuthDto);

    return result;
  }

  @Post('/register')
  async register(@Body() createUsuarioDto: CreateUsuarioDto) {
    if (createUsuarioDto.id_rol == ROLES.ADMIN) {
      throw new HttpException('Unauthorized', 401);
    }

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

    if (!existsPais) {
      throw new HttpException('PaisNotFound', 404);
    }

    if (!existsRol) {
      throw new HttpException('RolNotFound', 404);
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

  @UseGuards(AuthGuard('jwt'), AuthModuleGuard)
  @Patch('/change-password')
  async changePassword(
    @Request() req,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    await this.authService.changePassword(req.user.sub, changePasswordDto);
    return { statusCode: 200, message: 'UsuarioUpdated' };
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('/refresh')
  @HttpCode(200)
  async refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }
}
