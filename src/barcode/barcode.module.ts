import { Module } from '@nestjs/common';
import { BarcodeService } from './barcode.service';
import { BarcodeController } from './barcode.controller';
import { BarCode } from 'src/entities/barcode.entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entities';

@Module({
  imports: [TypeOrmModule.forFeature([BarCode, Product])],
  controllers: [BarcodeController],
  providers: [BarcodeService],
  exports: [TypeOrmModule, BarcodeService],
})
export class BarcodeModule {}
