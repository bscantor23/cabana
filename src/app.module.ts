import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { AlojamientosModule } from './alojamientos/alojamientos.module';

@Module({
  imports: [AuthModule, AlojamientosModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
