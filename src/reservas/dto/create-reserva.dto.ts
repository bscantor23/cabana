import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateDetalleDto {
  @IsNumber()
  @IsNotEmpty()
  id_temporada: number;

  @IsString()
  @IsDateString()
  @IsNotEmpty()
  fecha_inicio: Date;

  @IsString()
  @IsDateString()
  @IsNotEmpty()
  fecha_fin: Date;

  @IsNumber()
  @IsNotEmpty()
  interes: number;

  @IsNumber()
  @IsNotEmpty()
  valor_unitario: number;

  @IsNumber()
  @IsNotEmpty()
  cantidad_dias: number;

  @IsNumber()
  @IsNotEmpty()
  valor_hospedaje: number;
}

export class CreateReservaDto {
  @IsNumber()
  @IsNotEmpty()
  id_alojamiento: number;

  @IsNumber()
  @IsNotEmpty()
  numero_personas: number;

  @IsBoolean()
  @IsNotEmpty()
  incluye_mascotas: boolean;

  @IsString()
  @IsDateString()
  @IsNotEmpty()
  fecha_inicio: string;

  @IsString()
  @IsDateString()
  @IsNotEmpty()
  fecha_fin: string;
}
