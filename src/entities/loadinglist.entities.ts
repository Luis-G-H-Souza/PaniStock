import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Order } from "./order.entities";
import { Truck } from "./truck.entities";

@Entity('loadinglist')
export class LoadingList{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Order, (order) => order.loadinglist)
  order: Order[];

  @OneToOne(() => Truck, (truck) => truck.loadinglist)
  truck: Truck;

  @CreateDateColumn()
  creatAt: Date;
  
  @UpdateDateColumn()
  updateAt: Date;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}