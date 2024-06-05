import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AlojamientosService } from './alojamientos.service';
import { CreateAlojamientoDto } from './dto/create-alojamiento.dto';
import { UpdateAlojamientoDto } from './dto/update-alojamiento.dto';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AlojamientosModuleGuard } from './guards/alojamientos-module.guard';
import { AuthGuard } from '@nestjs/passport';
import { ROLES } from 'src/constants/roles';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('alojamientos')
export class AlojamientosController {
  constructor(private readonly alojamientosService: AlojamientosService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard, AlojamientosModuleGuard)
  @Roles('USUARIO')
  async create(@Body() createAlojamientoDto: CreateAlojamientoDto) {
    const [existsPropietario, existsTipoAlojamiento, existsCentroPoblado] =
      await Promise.all([
        this.alojamientosService.checkPropietario(
          createAlojamientoDto.id_propietario,
        ),
        this.alojamientosService.checkTipoAlojamiento(
          createAlojamientoDto.id_tipo_alojamiento,
        ),
        this.alojamientosService.checkCentroPoblado(
          createAlojamientoDto.id_centro_poblado,
        ),
      ]);

    if (!existsPropietario) {
      throw new HttpException('PropietarioNotFound', 404);
    }

    if (!existsTipoAlojamiento) {
      throw new HttpException('TipoAlojamientoNotFound', 404);
    }

    if (!existsCentroPoblado) {
      throw new HttpException('CentroPobladoNotFound', 404);
    }

    await this.alojamientosService.create(createAlojamientoDto);

    return { statusCode: 201, message: 'AlojamientoCreated' };
  }

  @Post('/files')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    if (!file) {
      throw new HttpException('FileNotFound', 404);
    }

    console.log('File uploded: ', file);
    return { statusCode: 201, message: 'FileUploaded' };
  }

  @Post('/search')
  async search(@Body() searchAlojamientoDto: Prisma.AlojamientoFindManyArgs) {
    if (searchAlojamientoDto.include) {
      throw new HttpException('InvalidSearch', 400);
    }

    let result = await this.alojamientosService.search(searchAlojamientoDto);
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id_alojamiento: string) {
    console.log(id_alojamiento);
    const existsAlojamiento =
      await this.alojamientosService.findOne(+id_alojamiento);
    if (!existsAlojamiento) {
      throw new HttpException('AlojamientoNotFound', 404);
    }

    return existsAlojamiento;
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard, AlojamientosModuleGuard)
  @Roles('USUARIO')
  async update(
    @Param('id') id_alojamiento: string,
    @Body() updateAlojamientoDto: UpdateAlojamientoDto,
  ) {
    const alojamiento =
      await this.alojamientosService.checkAlojamiento(+id_alojamiento);
    if (!alojamiento) {
      throw new HttpException('AlojamientoNotFound', 404);
    }

    if (alojamiento.id_propietario != updateAlojamientoDto.id_propietario) {
      throw new HttpException('Unauthorized', 401);
    }

    if (updateAlojamientoDto?.id_tipo_alojamiento) {
      const existsTipoAlojamiento =
        await this.alojamientosService.checkTipoAlojamiento(
          updateAlojamientoDto?.id_tipo_alojamiento,
        );
      if (!existsTipoAlojamiento) {
        throw new HttpException('TipoAlojamientoNotFound', 404);
      }
    }

    if (updateAlojamientoDto?.id_centro_poblado) {
      const existsTipoAlojamiento =
        await this.alojamientosService.checkCentroPoblado(
          updateAlojamientoDto?.id_centro_poblado,
        );
      if (!existsTipoAlojamiento) {
        throw new HttpException('CentroPobladoNotFound', 404);
      }
    }

    await this.alojamientosService.update(
      +id_alojamiento,
      updateAlojamientoDto,
    );

    return { statusCode: 200, message: 'AlojamientoUpdated' };
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard, AlojamientosModuleGuard)
  @Roles('USUARIO')
  async remove(@Param('id') id_alojamiento: string, @Request() req) {
    const alojamiento =
      await this.alojamientosService.checkAlojamiento(+id_alojamiento);
    if (!alojamiento) {
      throw new HttpException('AlojamientoNotFound', 404);
    }

    if (alojamiento.id_propietario != req.user.sub) {
      throw new HttpException('Unauthorized', 401);
    }

    const existsReservas =
      await this.alojamientosService.checkReservas(+id_alojamiento);
    if (existsReservas && existsReservas.length > 0) {
      throw new HttpException('ReservasCascadeDependency', 400);
    }

    await this.alojamientosService.remove(+id_alojamiento);

    return { statusCode: 200, message: 'AlojamientoDeleted' };
  }
}
