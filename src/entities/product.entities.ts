import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: string;
  
  @Column()
  barCode: string
  
  @Column()
  productCode: string;

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
