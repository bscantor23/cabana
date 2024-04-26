import { HttpException, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { PrismaService } from 'src/prisma.service';
import { hash, compare } from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { roles } from 'prisma/constants/roles';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerAuthDto: RegisterAuthDto) {
    const { clave } = registerAuthDto;
    const plainToHash = await hash(clave, 10);

    registerAuthDto.clave = plainToHash;

    return this.prisma.usuario.create({ data: registerAuthDto });
  }

  async login(loginAuthDto: LoginAuthDto) {
    const findUser = await this.prisma.usuario.findFirst({
      where: {
        correo_electronico: loginAuthDto.correo_electronico,
      },
    });

    if (!findUser) throw new HttpException('USER_NOT_FOUND', 404);

    const checkPassword = await compare(loginAuthDto.clave, findUser.clave);

    if (!checkPassword) throw new HttpException('INVALID_PASSWORD', 403);

    const token = await this.jwtService.sign({
      sub: findUser.id_usuario,
      role: findUser.id_rol,
    });

    const data = { user: findUser, token };

    return data;
  }
}
