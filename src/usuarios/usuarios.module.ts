import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { UsuariosModuleGuard } from './guards/usuarios-module.guard';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService, PrismaService, UsuariosModuleGuard],
})
export class UsuariosModule {}
