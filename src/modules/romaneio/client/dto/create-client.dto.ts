import { Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsString, ValidateNested } from "class-validator";

class AddressDto {
  @IsString()
  street: string;

  @IsString()
  number: string;

  @IsString()
  neighborhood: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  zip_code: string;
}


export class CreateClientDto {

  @IsString()
  document: string;

  @IsString()
  socialReason: string;

  @IsString()
  fantasyName: string;

  @IsString()
  phone: string;

  @IsArray()
  @ArrayMinSize(1) 
  @ArrayMaxSize(1)
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  address: AddressDto[];

  @IsString()
  region: string;

}
