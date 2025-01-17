import { IsDecimal, IsInt, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.05)
  price: number;

  @IsNotEmpty()
  @IsString()
  barCode: string;
}