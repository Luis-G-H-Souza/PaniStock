import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entities';
import { BarCode } from 'src/entities/barcode.entities';
import { Price } from 'src/entities/price.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Product, BarCode, Price])],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
