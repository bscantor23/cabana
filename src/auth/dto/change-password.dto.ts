import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  clave_anterior: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  clave_nueva: string;
}
