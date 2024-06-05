import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateUsuarioDto {
  @IsNumber()
  @IsOptional()
  id_tipo_documento?: number;

  @IsNumber()
  @IsOptional()
  id_pais?: number;

  @IsString()
  @IsOptional()
  correo_electronico?: string;

  @IsString()
  @IsOptional()
  primer_nombre?: string;

  @IsString()
  @IsOptional()
  segundo_nombre?: string;

  @IsString()
  @IsOptional()
  primer_apellido?: string;

  @IsString()
  @IsOptional()
  segundo_apellido?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  direccion_residencia?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional({ each: true })
  @MaxLength(30, { each: true })
  telefonos?: string[];
}
