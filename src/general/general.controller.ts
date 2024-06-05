import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpCode,
} from '@nestjs/common';
import { GeneralService } from './general.service';
import { Prisma } from '@prisma/client';

@Controller('general')
export class GeneralController {
  constructor(private readonly generalService: GeneralService) {}

  @Post('/tipos-pagos')
  @HttpCode(200)
  getTiposPagos(@Body() tiposPagosDto: Prisma.TipoPagoFindManyArgs) {
    if (tiposPagosDto.include) {
      throw new HttpException('InvalidSearch', 400);
    }

    return this.generalService.getTiposPagos(tiposPagosDto);
  }

  @Post('/centros-poblados')
  @HttpCode(200)
  getCentrosPoblados(
    @Body() centrosPobladosDto: Prisma.CentroPobladoFindManyArgs,
  ) {
    if (centrosPobladosDto.include) {
      throw new HttpException('InvalidSearch', 400);
    }

    return this.generalService.getCentrosPoblados(centrosPobladosDto);
  }

  @Post('/ciudades')
  @HttpCode(200)
  getCiudades(@Body() ciudadesDto: Prisma.CiudadFindManyArgs) {
    if (ciudadesDto.include) {
      throw new HttpException('InvalidSearch', 400);
    }

    return this.generalService.getCiudades(ciudadesDto);
  }

  @Post('/departamentos')
  @HttpCode(200)
  getDepartamentos(@Body() departamentosDto: Prisma.DepartamentoFindManyArgs) {
    if (departamentosDto.include) {
      throw new HttpException('InvalidSearch', 400);
    }

    return this.generalService.getDepartamentos(departamentosDto);
  }

  @Post('/tipos-documentos')
  @HttpCode(200)
  getTiposDocumentos(
    @Body() tiposDocumentosDto: Prisma.TipoDocumentoFindManyArgs,
  ) {
    if (tiposDocumentosDto.include) {
      throw new HttpException('InvalidSearch', 400);
    }

    return this.generalService.getTiposDocumentos(tiposDocumentosDto);
  }

  @Post('/paises')
  @HttpCode(200)
  getPaises(@Body() paisesDto: Prisma.PaisFindManyArgs) {
    if (paisesDto.include) {
      throw new HttpException('InvalidSearch', 400);
    }

    return this.generalService.getPaises(paisesDto);
  }

  @Post('/temporadas')
  @HttpCode(200)
  getTemporadas(@Body() temporadasDto: Prisma.TemporadaFindManyArgs) {
    if (temporadasDto.include) {
      throw new HttpException('InvalidSearch', 400);
    }

    return this.generalService.getTemporadas(temporadasDto);
  }

  @Post('/tipos-alojamientos')
  @HttpCode(200)
  getTiposAlojamientos(
    @Body() tiposAlojamientosDto: Prisma.TipoAlojamientoFindManyArgs,
  ) {
    if (tiposAlojamientosDto.include) {
      throw new HttpException('InvalidSearch', 400);
    }

    return this.generalService.getTiposAlojamientos(tiposAlojamientosDto);
  }
}
