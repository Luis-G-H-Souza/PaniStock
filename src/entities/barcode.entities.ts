import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entities';

@Entity('bar-code')
export class BarCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  barCode: string;

  @ManyToOne(() => Product, (product) => product.barcode)
  product: Product;

  @Column()
  id_product: number;

  @CreateDateColumn()
  creatAt: Date;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
