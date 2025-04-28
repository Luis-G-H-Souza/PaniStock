import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {

  @IsNotEmpty()
  @IsString()
  barCode: string;

  @IsNotEmpty()
  @IsString()
  productCode: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  quantBox: number;

  @IsOptional()
  @IsString()
  description?: string;
}
