import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginAuthDto {
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
}
