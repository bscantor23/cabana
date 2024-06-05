import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  Min,
} from 'class-validator';

export class CreatePagoDto {
  @IsNumber()
  @IsNotEmpty()
  id_reserva: number;

  @IsNumber()
  @IsNotEmpty()
  id_tipo_pago: number;

  @IsDateString()
  @IsNotEmpty()
  fecha_historico: string;

  @IsNumberString()
  @IsNotEmpty()
  valor_cancelado: string;
}
