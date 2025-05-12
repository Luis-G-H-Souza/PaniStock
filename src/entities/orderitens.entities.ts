
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entities";
import { Order } from "./order.entities";

@Entity('orderItens')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, (order) => order.itens)
  orders: Order;

  @ManyToOne(() => Product,)
  product: Product;

  @Column('int')
  quantity: number
}