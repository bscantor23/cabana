import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterAuthDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  id_rol: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  id_tipo_documento: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  id_pais: string;

  @IsString()
  @MaxLength(50)
  numero_identificacion: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100)
  correo_electronico: string;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @IsNotEmpty()
  clave: string;

  @IsString()
  @MaxLength(70)
  @IsNotEmpty()
  primer_nombre: string;

  @IsString()
  @MaxLength(70)
  @IsNotEmpty()
  segundo_nombre: string;

  @IsString()
  @MaxLength(70)
  @IsNotEmpty()
  primer_apellido: string;

  @IsString()
  @MaxLength(70)
  @IsNotEmpty()
  segundo_apellido: string;

  @IsString()
  @MaxLength(200)
  @IsNotEmpty()
  direccion_residencia: string;
}
