import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, ValidateIf } from "class-validator";
import { CapacityType, OwnershipType } from "src/entities/truck.entities";

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
  @IsEnum(OwnershipType)
  ownership_type: OwnershipType;

  @ValidateIf((o) => o.ownership_type !== 'OWNED')
  @IsNotEmpty({ message: 'ownership_name is required when truck is not OWNED' })
  @IsString()
  ownership_name?: string;

  @IsOptional()
  @IsEnum(CapacityType)
  type_capacity: CapacityType;

  @IsNotEmpty()
  @IsNumber()
  capacity: number;

}
