
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entities";
import { Order } from "./order.entities";

@Entity('orderItens')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Order, (order) => order.itens, { cascade: true, eager: true })
  orders: Order;

  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @Column('int')
  quantity: number
}