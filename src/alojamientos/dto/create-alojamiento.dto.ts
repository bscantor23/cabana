import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class FotografiaAlojamientoDto {
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  uri: string;
}

export class CreateAlojamientoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  id_propietario: string;

  @IsNumber()
  @IsNotEmpty()
  id_tipo_alojamiento: number;

  @IsNumber()
  @IsNotEmpty()
  id_centro_poblado: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  direccion_fisica: string;

  @IsString()
  @IsNotEmpty()
  valor_hospedaje: string;

  @IsNumber()
  @IsNotEmpty()
  cupo_persona: number;

  @IsNumber()
  @IsNotEmpty()
  numero_habitaciones: number;

  @IsNumber()
  @IsNotEmpty()
  numero_banos: number;

  @IsBoolean()
  @IsNotEmpty()
  tiene_calefaccion: boolean;

  @IsBoolean()
  @IsNotEmpty()
  permite_mascotas: boolean;

  @IsArray()
  @IsOptional()
  fotografias?: FotografiaAlojamientoDto[];
}
