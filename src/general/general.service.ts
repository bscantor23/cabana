import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class GeneralService {
  constructor(private prisma: PrismaService) {}

  async getCentrosPoblados(
    centrosPobladosDto: Prisma.CentroPobladoFindManyArgs,
  ) {
    try {
      let result = await this.prisma.centroPoblado.findMany(centrosPobladosDto);
      return result;
    } catch (e) {
      console.log(e);
      throw new HttpException('InvalidSearch', 400);
    }
  }

  async getTiposPagos(tiposPagosDto: Prisma.TipoPagoFindManyArgs) {
    try {
      let result = await this.prisma.tipoPago.findMany(tiposPagosDto);
      return result;
    } catch (e) {
      console.log(e);
      throw new HttpException('InvalidSearch', 400);
    }
  }

  async getCiudades(ciudadesDto: Prisma.CiudadFindManyArgs) {
    try {
      let result = await this.prisma.ciudad.findMany(ciudadesDto);
      return result;
    } catch (e) {
      console.log(e);
      throw new HttpException('InvalidSearch', 400);
    }
  }

  async getDepartamentos(departamentosDto: Prisma.DepartamentoFindManyArgs) {
    try {
      let result = await this.prisma.departamento.findMany(departamentosDto);
      return result;
    } catch (e) {
      console.log(e);
      throw new HttpException('InvalidSearch', 400);
    }
  }

  async getTiposDocumentos(
    tiposDocumentosDto: Prisma.TipoDocumentoFindManyArgs,
  ) {
    try {
      let result = await this.prisma.tipoDocumento.findMany(tiposDocumentosDto);
      return result;
    } catch (e) {
      console.log(e);
      throw new HttpException('InvalidSearch', 400);
    }
  }

  async getPaises(paisesDto: Prisma.PaisFindManyArgs) {
    try {
      let result = await this.prisma.pais.findMany(paisesDto);
      return result;
    } catch (e) {
      console.log(e);
      throw new HttpException('InvalidSearch', 400);
    }
  }

  async getTemporadas(temporadasDto: Prisma.TemporadaFindManyArgs) {
    try {
      let result = await this.prisma.temporada.findMany(temporadasDto);
      return result;
    } catch (e) {
      console.log(e);
      throw new HttpException('InvalidSearch', 400);
    }
  }

  async getTiposAlojamientos(
    tiposAlojamientosDto: Prisma.TipoAlojamientoFindManyArgs,
  ) {
    try {
      let result =
        await this.prisma.tipoAlojamiento.findMany(tiposAlojamientosDto);
      return result;
    } catch (e) {
      console.log(e);
      throw new HttpException('InvalidSearch', 400);
    }
  }
}
