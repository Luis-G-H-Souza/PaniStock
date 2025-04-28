import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/products.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entities';
import { DatabaseModule } from './database/data-source';
import { User } from './entities/user.entities';
import { BarCode } from './entities/barcode.entities';
import { BarcodeModule } from './barcode/barcode.module';
import { TruckModule } from './modules/truck/truck.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Product, User, BarCode]),
    DatabaseModule,
    ProductsModule,
    BarcodeModule,
    TruckModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
