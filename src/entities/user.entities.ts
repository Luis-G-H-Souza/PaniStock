import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserFunction {
  ADMIN = 'admin',
  SALES = 'sales',
  STOCK = 'stock',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserFunction,
  })
  function: UserFunction;

  @CreateDateColumn()
  creatAt: Date;
  
  @UpdateDateColumn()
  updateAt: Date;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

}
