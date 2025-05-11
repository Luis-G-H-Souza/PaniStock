import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { OrderStatus } from "src/entities/order.entities";

export class OrderItensDTO {
  @IsNotEmpty()
  @IsString()
  productCode: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number

}

export class CreateOrderDto {

  @IsNotEmpty()
  @IsString()
  clientDocument: string;

  @IsArray()
  @ArrayMinSize(1) 
  @ValidateNested({ each: true })
  @Type(() => OrderItensDTO)
  itens: OrderItensDTO[];

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  arrivalDate: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  deliveryDate: Date;

  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

}
