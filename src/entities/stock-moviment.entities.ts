import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entities";
import { Product } from "./product.entities";

export enum StockFunction {
  ENTRY = 'entry',
  EXIT = 'exit',
}

Entity('stock-moviment')
export class StockMoviment {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'enum',
    enum: StockFunction,
  })
  moviment: StockFunction

  @Column()
  date: Date
  
}