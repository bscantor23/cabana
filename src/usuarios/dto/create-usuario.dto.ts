import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  id_usuario: string;

  @IsNumber()
  @IsNotEmpty()
  id_rol: number;

  @IsNumber()
  @IsNotEmpty()
  id_tipo_documento: number;

  @IsNumber()
  @IsNotEmpty()
  id_pais: number;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  correo_electronico: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  clave: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  primer_nombre: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  segundo_nombre: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  primer_apellido: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  segundo_apellido: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  direccion_residencia: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @MaxLength(30, { each: true })
  telefonos?: string[];
}
