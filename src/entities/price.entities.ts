import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entities";

@Entity('price')
export class Price {

  @PrimaryGeneratedColumn()
  id: number

  @Column('decimal', { precision: 10, scale: 2 })
  price: number

  @ManyToOne(()=> Product, (product) => product.price)
  id_product: number

  @CreateDateColumn()
  creatAt: Date
}