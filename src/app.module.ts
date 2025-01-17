import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';
import { StockModule } from './stock/stock.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entities';
import { DatabaseModule } from './database/data-source';
import { Stock } from './entities/stock.entities';
import { User } from './entities/user.entities';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Product, Stock, User]),
    DatabaseModule,
    ProductsModule, SalesModule, StockModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
