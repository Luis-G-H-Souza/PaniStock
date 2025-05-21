import { ArrayNotEmpty, IsArray, IsNotEmpty, IsUUID } from "class-validator";


export class CreateLoadingListDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  orderId: string[];

  @IsNotEmpty()
  @IsUUID()
  truckId: string;
}
