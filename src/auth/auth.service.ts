import { Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { PrismaService } from 'src/prisma.service';
import { hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(registerAuthDto: RegisterAuthDto) {
    const { clave } = registerAuthDto;
    const plainToHash = await hash(clave, 10);

    registerAuthDto.clave = plainToHash;
    const data = registerAuthDto;

    return await this.prisma.usuario.create({ data });
  }
}
