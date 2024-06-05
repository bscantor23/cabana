import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  Request,
} from '@nestjs/common';
import { PagosService } from './pagos.service';
import { CreatePagoDto } from './dto/create-pago.dto';
import { Prisma } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ROLES } from 'src/constants/roles';

@Controller('pagos')
export class PagosController {
  constructor(private readonly pagosService: PagosService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @Roles('USUARIO')
  async create(@Request() req, @Body() createPagoDto: CreatePagoDto) {
    const [existsReserva, existsTipoPago] = await Promise.all([
      this.pagosService.checkReserva(createPagoDto.id_reserva, req.user.sub),
      this.pagosService.checkTipoPago(createPagoDto.id_tipo_pago),
    ]);

    if (existsReserva.valor_cancelado >= existsReserva.valor_hospedaje) {
      throw new HttpException('ReservaAlreadyPaid', 400);
    }

    if (
      existsReserva.valor_cancelado + Number(createPagoDto.valor_cancelado) >
      existsReserva.valor_hospedaje
    ) {
      throw new HttpException('ValorCanceladoExceeds', 400);
    }

    if (!existsReserva) {
      throw new HttpException('ReservaNotFound', 404);
    }

    if (!existsTipoPago) {
      throw new HttpException('TipoPagoNotFound', 404);
    }

    await this.pagosService.create(createPagoDto);
    return { statusCode: 201, message: 'PagoCreated' };
  }

  @Post('/search/:id_reserva')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @Roles('USUARIO', 'ADMIN')
  async searchByReserva(
    @Request() req,
    @Param('id_reserva') id_reserva: string,
    @Body() searchPagoDto: Prisma.PagoReservaFindManyArgs,
  ) {
    if (req.user.role === ROLES.USUARIO) {
      let reserva = await this.pagosService.checkReserva(
        +id_reserva,
        req.user.sub,
      );
      if (!reserva) {
        throw new HttpException('ReservaNotFound', 404);
      }
    }

    if (searchPagoDto.include) {
      throw new HttpException('InvalidSearch', 400);
    }

    let result = await this.pagosService.searchByReserva(
      +id_reserva,
      searchPagoDto,
    );
    return result;
  }

  @Post('/search')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @Roles('ADMIN','USUARIO')
  async search(@Body() searchPagoDto: Prisma.PagoReservaFindManyArgs) {
    if (searchPagoDto.include) {
      throw new HttpException('InvalidSearch', 400);
    }

    let result = await this.pagosService.search(searchPagoDto);
    return result;
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @Roles('ADMIN', 'USUARIO')
  async findOne(@Param('id') id_pago_reserva: string, @Request() req) {
    const existsPago = await this.pagosService.findOne(+id_pago_reserva);
    if (!existsPago) {
      throw new HttpException('PagoNotFound', 404);
    }

    if (req.user.role === ROLES.USUARIO) {
      let reserva = await this.pagosService.checkReserva(
        existsPago.reserva.id_reserva,
        req.user.sub,
      );
      if (!reserva) {
        throw new HttpException('ReservaNotFound', 404);
      }
    }

    return existsPago;
  }
}
