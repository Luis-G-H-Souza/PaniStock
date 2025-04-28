import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('truck')
export class Truck {

  @Column()
  plate: string;

  @Column()
  driver: string;

  @Column({ nullable: true })
  capacity?: string;

  @CreateDateColumn()
  creatAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

}