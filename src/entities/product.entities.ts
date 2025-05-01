import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { BarCode } from './barcode.entities';
@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: string;
  @OneToMany(() => BarCode, (barcode) => barcode.product)
  barcode: BarCode[];

  @Column()
  name: string;

  @CreateDateColumn()
  creatAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
