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

export class UpdateAlojamientoDto {
  @IsString()
  @IsOptional()
  @MaxLength(30)
  id_propietario?: string;

  @IsNumber()
  @IsOptional()
  id_tipo_alojamiento?: number;

  @IsNumber()
  @IsOptional()
  id_centro_poblado?: number;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  titulo?: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  direccion_fisica?: string;

  @IsString()
  @IsOptional()
  valor_hospedaje?: string;

  @IsNumber()
  @IsOptional()
  cupo_persona?: number;

  @IsNumber()
  @IsOptional()
  numero_habitaciones?: number;

  @IsNumber()
  @IsOptional()
  numero_banos?: number;

  @IsBoolean()
  @IsOptional()
  tiene_calefaccion?: boolean;

  @IsBoolean()
  @IsOptional()
  permite_mascotas?: boolean;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;

  @IsArray()
  @IsOptional()
  fotografias?: FotografiaAlojamientoDto[];
}
