import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entities";
import { SaleItem } from "./sales-item.entities";

export enum PaymentFunction {
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  PIX = 'pix',
  CASH = 'cash',
}

@Entity('sale')
export class Sale {
  @PrimaryGeneratedColumn()
  transaction_id: number

  @ManyToOne(() => User, (user) => user.sales)
  user_id: User

  @OneToMany(() => SaleItem, (saleItem) => saleItem.sale)
  salesItem: SaleItem[]

  @Column('decimal', { precision: 10, scale: 2 })
  total_price: number

  @Column({
    type: 'enum',
    enum: PaymentFunction,
  })
  payment_gateway: PaymentFunction

  @Column('decimal', { precision: 10, scale: 2 })
  discount: number

  @Column('varchar')
  barcode_scanned: string

  @CreateDateColumn()
  transaction_date: Date
}