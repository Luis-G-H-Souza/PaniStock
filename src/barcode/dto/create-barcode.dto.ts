import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateBarcodeDto {

  @IsNotEmpty()
  @IsString()
  barCode: string
  
}
