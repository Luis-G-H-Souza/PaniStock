import { Module } from '@nestjs/common';
import { PricesService } from './prices.service';
import { PricesController } from './prices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarCode } from 'src/entities/barcode.entities';
import { Product } from 'src/entities/product.entities';
import { Price } from 'src/entities/price.entities';

@Module({
  imports: [TypeOrmModule.forFeature([BarCode, Product, Price])],
  controllers: [PricesController],
  providers: [PricesService],
})
export class PricesModule {}
