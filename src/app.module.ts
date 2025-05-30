import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/products.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entities';
import { DatabaseModule } from './database/data-source';
import { User } from './entities/user.entities';
import { TruckModule } from './modules/loading-list/truck/truck.module';
import { ClientModule } from './modules/loading-list/client/client.module';
import { OrderModule } from './modules/loading-list/order/order.module';
import { LoadingListModule } from './modules/loading-list/loading-list/loading-list.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Product, User]),
    DatabaseModule,
    ProductsModule,
    TruckModule,
    ClientModule,
    OrderModule,
    LoadingListModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
