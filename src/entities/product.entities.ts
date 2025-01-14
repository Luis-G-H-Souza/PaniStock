import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SaleItem } from "./sales-item.entities";
import { Stock } from "./stock.entities";


@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number

  @OneToMany(() => SaleItem, (saleitem) => saleitem.product)
  saleItem: SaleItem[]

  @OneToMany(() => Stock, (stock) => stock.product_id)
  stock: Stock[]

  @Column()
  name: string

  @Column('decimal', { precision: 10, scale: 2 })
  price: number

  @Column()
  CODE: string

  @CreateDateColumn()
  creatAt: Date
}