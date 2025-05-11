import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Client } from "./client.entities";
import { Truck } from "./truck.entities";
import { OrderItem } from "./orderitens.entities";

export enum OrderStatus{
  OPEN = 'open',
  APPROVED = 'approved',
  CLOSED = 'closed',
  CANCELED = 'canceled',
}

@Entity('order')
export class Order{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Client, (client) => client.orders, { eager: true })
  client: Client;

  @OneToMany(() => OrderItem, (item) => item.orders, { cascade: true, eager: true })
  itens: OrderItem[];

  @Column({ type: 'timestamp' })
  arrivalDate: Date;

  @Column({ type: 'timestamp' })
  deliveryDate: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  status: string; // Mudar para ENUM Ex: 'Aguardando', 'Em transporte', 'Entregue'

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}