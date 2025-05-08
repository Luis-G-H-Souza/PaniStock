import { Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Matches, ValidateNested } from "class-validator";

export class CepLookupDto {
  @IsNotEmpty()
  @Matches(/^\d{5}-?\d{3}$/, { message: 'CEP inválido' })
  zip_code: string;
}

export class AddressDto {
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

  @IsNotEmpty()
  @IsString()
  zip_code: string;
}


export class CreateClientDto {

  @IsNotEmpty()
  @IsString()
  document: string;

  @IsNotEmpty()
  @IsString()
  socialReason: string;

  @IsNotEmpty()
  @IsString()
  fantasyName: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsArray()
  @ArrayMinSize(1) 
  @ArrayMaxSize(1)
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  address: AddressDto[];

  @IsOptional()
  @IsString()
  region?: string;

}
