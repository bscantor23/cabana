import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { compare, hash } from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    const { clave, correo_electronico } = loginAuthDto;

    const findUser = await this.prisma.usuario.findFirst({
      where: {
        correo_electronico,
      },
      include: {
        telefonos: true,
      },
    });

    if (!findUser) throw new HttpException('UsuarioNotFound', 404);

    const checkPassword = await compare(clave, findUser.clave);

    if (!checkPassword) throw new HttpException('InvalidPassword', 403);

    const accessToken = await this.jwtService.sign({
      sub: findUser.id_usuario,
      role: findUser.id_rol,
    });

    const refreshToken = await this.jwtService.sign(
      {
        sub: findUser.id_usuario,
        role: findUser.id_rol,
      },
      { secret: process.env.JWT_REFRESH_TOKEN_SECRET, expiresIn: '1d' },
    );

    const data = { user: findUser, refreshToken, accessToken };

    return data;
  }

  async changePassword(
    id_usuario: string,
    changePasswordDto: ChangePasswordDto,
  ) {
    const { clave_anterior, clave_nueva } = changePasswordDto;

    const findUser = await this.prisma.usuario.findUnique({
      where: {
        id_usuario,
      },
    });

    if (!findUser) {
      throw new HttpException('UsuarioNotFound', 404);
    }

    const checkPassword = await compare(clave_anterior, findUser.clave);
    if (!checkPassword) {
      throw new HttpException('InvalidPassword', 403);
    }

    const plainToHash = await hash(clave_nueva, 10);

    await this.prisma.usuario.update({
      where: {
        id_usuario,
      },
      data: {
        clave: plainToHash,
      },
    });
  }

  async refreshToken(user: { sub: string; role: number }) {
    return {
      accessToken: this.jwtService.sign({
        sub: user.sub,
        role: user.role,
      }),
    };
  }
}
