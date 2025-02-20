import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SaleItem } from './sales-item.entities';
import { Stock } from './stock.entities';
import { BarCode } from './barcode.entities';
import { Price } from './price.entities';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => SaleItem, (saleitem) => saleitem.product)
  saleItem: SaleItem[];

  @OneToMany(() => Stock, (stock) => stock.product_id)
  stock: Stock[];

  @OneToMany(() => BarCode, (barcode) => barcode.product)
  barcode: BarCode[];

  @Column()
  name: string;

  @OneToMany(() => Price, (price) => price.product)
  price: Price[];

  @Column('decimal', { precision: 10, scale: 2 })
  cost_price: number;

  @CreateDateColumn()
  creatAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
