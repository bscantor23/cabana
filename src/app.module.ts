import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AlojamientosModule } from './alojamientos/alojamientos.module';
import { ReservasModule } from './reservas/reservas.module';
import { PagosModule } from './pagos/pagos.module';
import { GeneralModule } from './general/general.module';

@Module({
  imports: [
    AuthModule,
    UsuariosModule,
    AlojamientosModule,
    ReservasModule,
    PagosModule,
    GeneralModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
