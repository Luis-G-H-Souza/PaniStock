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

  @Column({ nullable: true })
  description?: string;

 @CreateDateColumn()
  creatAt: Date;
  
  @UpdateDateColumn()
  updateAt: Date;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
