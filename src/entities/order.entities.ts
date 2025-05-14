import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Client } from "./client.entities";
import { OrderItem } from "./orderitens.entities";
import { LoadingList } from "./loadinglist.entities";

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

  @ManyToOne(() => Client, (client) => client.orders)
  client: Client;

  @OneToMany(() => OrderItem, (item) => item.orders, { cascade: true, eager: true })
  itens: OrderItem[];

  @ManyToOne(() => LoadingList, (loadinglist) => loadinglist.order)
  loadinglist: LoadingList;

  @Column({ type: 'timestamp' })
  truckarrivalDate: Date;

  @Column({ type: 'timestamp' })
  deliveryDate: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  status: string; // Mudar para ENUM Ex: 'Aguardando', 'Em transporte', 'Entregue'

  @CreateDateColumn()
  creatAt: Date;
  
  @UpdateDateColumn()
  updateAt: Date;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}