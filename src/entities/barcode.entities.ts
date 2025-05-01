import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './product.entities';

@Entity('bar-code')
export class BarCode {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  barCode: string;

  @ManyToOne(() => Product, (product) => product.barcode)
  product: Product;

  @Column()
  id_product: number;

  @CreateDateColumn()
  creatAt: Date;

  @UpdateDateColumn()
    updateAt: Date;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
