import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Sale } from "./sale.entities";
import { Product } from "./product.entities";

@Entity('sale-item')
export class SaleItem {

  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Sale, (sale) => sale.salesItem)
  sale: Sale[]

  @ManyToOne(() => Product, (product) => product.saleItem)
  product: Product[]

  @Column()
  quantity: number

  @Column('decimal', { precision: 10, scale: 2 })
  unit_price: number

  @Column('decimal', { precision: 10, scale: 2 })
  total_price: number

  @CreateDateColumn()
  creatAt: Date
}