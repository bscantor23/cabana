import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { Prisma } from '@prisma/client';
import { CreateEncuestaDto } from './dto/create-encuesta.dto';
import { generateDetalles } from './utils/generate-detalles.utils';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { iso8601Regex } from 'src/constants/regex';

import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import * as isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(utc);

@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @Roles('USUARIO')
  async create(@Request() req, @Body() createReservaDto: CreateReservaDto) {
    if (!iso8601Regex.test(createReservaDto.fecha_fin)) {
      throw new HttpException('FechaFinInvalidDateTime', 400);
    }

    if (!iso8601Regex.test(createReservaDto.fecha_inicio)) {
      throw new HttpException('FechaInicioInvalidDateTime', 400);
    }

    if (
      dayjs(createReservaDto.fecha_inicio, 'YYYY-MM-DD').isAfter(
        dayjs(createReservaDto.fecha_fin, 'YYYY-MM-DD'),
      )
    ) {
      throw new HttpException('FechaInicioAfterFechaFin', 400);
    }

    const [existsArrendatario, existsAlojamiento, disponibilidad, temporadas] =
      await Promise.all([
        this.reservasService.checkArrendatario(req.user.sub),
        this.reservasService.checkAlojamiento(createReservaDto.id_alojamiento),
        this.reservasService.checkDisponibilidad(
          createReservaDto.id_alojamiento,
          new Date(createReservaDto.fecha_inicio),
          new Date(createReservaDto.fecha_fin),
        ),
        this.reservasService.getTemporadas(),
      ]);

    if (!existsArrendatario) {
      throw new HttpException('ArrendatarioNotFound', 404);
    }

    if (!existsAlojamiento) {
      throw new HttpException('AlojamientoNotFound', 404);
    }

    if (disponibilidad) {
      throw new HttpException('ReservaAlreadyExists', 400);
    }

    if (existsAlojamiento.id_propietario == req.user.sub) {
      throw new HttpException('ArrendatarioIsOwner', 400);
    }

    if (existsAlojamiento.cupo_persona < createReservaDto.numero_personas) {
      throw new HttpException('CupoPersonasExceeded', 400);
    }

    const detalles = generateDetalles(
      createReservaDto,
      temporadas,
      existsAlojamiento,
    );

    await this.reservasService.create(req.user.sub, createReservaDto, detalles);

    return { statusCode: 201, message: 'ReservaCreated' };
  }

  @Post('/search')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @Roles('USUARIO', 'ADMIN')
  async search(@Body() searchReservaDto: Prisma.ReservaFindManyArgs) {
    let result = await this.reservasService.search(searchReservaDto);
    return result;
  }

  @Post('/survey/:id_reserva')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @Roles('USUARIO')
  async survey(
    @Param('id_reserva') id_reserva: string,
    @Request() req,
    @Body() surveyDto: CreateEncuestaDto,
  ) {
    let reserva = await this.reservasService.checkReserva(
      +id_reserva,
      req.user.sub,
    );
    if (!reserva) {
      throw new HttpException('ReservaNotFound', 404);
    }

    if (Number(reserva.valor_hospedaje) != Number(reserva.valor_cancelado)) {
      throw new HttpException('ReservaNotPaid', 400);
    }

    let encuesta = await this.reservasService.checkEncuesta(+id_reserva);
    if (encuesta) {
      throw new HttpException('EncuestaAlreadyExists', 400);
    }

    await this.reservasService.survey(+id_reserva, surveyDto);

    return { statusCode: 201, message: 'EncuestaCreated' };
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @Roles('ADMIN', 'USUARIO')
  async findOne(@Param('id') id_reserva: string, @Request() req) {
    const existsReserva = await this.reservasService.findOne(
      +id_reserva,
      req.user,
    );
    if (!existsReserva) {
      throw new HttpException('ReservaNotFound', 404);
    }

    return existsReserva;
  }
}
