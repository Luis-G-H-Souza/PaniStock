import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePriceDto {
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
