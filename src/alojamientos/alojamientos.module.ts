import { Module } from '@nestjs/common';
import { AlojamientosService } from './alojamientos.service';
import { AlojamientosController } from './alojamientos.controller';
import { PrismaService } from 'src/prisma.service';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'uploads'),
      exclude: ['/api*'],
    }),
  ],
  controllers: [AlojamientosController],
  providers: [AlojamientosService, PrismaService],
})
export class AlojamientosModule {}
