import { Module } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { PagosController } from './pagos.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PagosController],
  providers: [PagosService, PrismaService],
})
export class PagosModule {}
