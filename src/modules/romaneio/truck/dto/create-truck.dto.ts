import { IsBoolean, IsDateString, IsIn, IsNotEmpty, IsOptional, IsString, Matches, ValidateIf } from "class-validator";

export class CreateTruckDto {

  @IsString()
  @Matches(/^[A-Z]{3}-?[0-9][A-Z0-9][0-9]{2}$/, {
    message: 'plate must be in the correct format: ABC-1234 or ABC-1C34',
  })
  @IsNotEmpty()
  @IsString()
  plate: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsNotEmpty()
  @IsIn(['OWNED', 'CLIENT', 'CARRIER'])
  ownership_type: 'OWNED' | 'CLIENT' | 'CARRIER';

  @ValidateIf((o) => o.ownership_type !== 'OWNED')
  @IsNotEmpty({ message: 'Ownership name is required when truck is not OWNED' })
  @IsString()
  ownership_name?: string;

  @IsOptional()
  @IsString()
  capacity?: string;

}
