import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/entities/client.entities';
import { Product } from 'src/entities/product.entities';
import { Order } from 'src/entities/order.entities';
import { OrderItem } from 'src/entities/orderitens.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Product, Order, OrderItem])],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService]
})
export class OrderModule {}
