import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateEncuestaDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  calificacion: number;

  @IsString()
  @IsNotEmpty()
  comentario: string;
}
