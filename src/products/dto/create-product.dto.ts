import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreatePorductDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(0.05)
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  stock: number;

}