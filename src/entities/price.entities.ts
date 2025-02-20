import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entities';

@Entity('price')
export class Price {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @ManyToOne(() => Product, (product) => product.barcode)
  product: Product;

  @Column()
  id_product: number;

  @CreateDateColumn()
  creatAt: Date;
}
