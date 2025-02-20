import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entities';
import { Product } from './product.entities';

@Entity('stock')
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.stock)
  user_id: User;

  @ManyToOne(() => Product, (product) => product.stock)
  product_id: Product;

  @Column('decimal', { precision: 10 })
  quantity: number;

  @Column('decimal', { precision: 10 })
  minimum_quantity: number;

  @Column('decimal', { precision: 10 })
  maximum_quantity: number;

  @Column()
  supplier: string;

  @CreateDateColumn()
  creatAt: Date;
}
