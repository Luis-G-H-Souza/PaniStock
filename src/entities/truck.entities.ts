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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  plate: string;

  @Column({ nullable: true })
  model?: string;
  
  @Column({ nullable: true })
  brand?: string;

  @Column({ nullable: true })
  capacity?: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'enum', enum: ['OWNED', 'CLIENT', 'CARRIER'], default: 'OWNED' })
  ownership_type: 'OWNED' | 'CLIENT' | 'CARRIER';

  @Column({ nullable: true })
  ownership_name?: string;

  @Column({ type: 'boolean', default: false })
  in_maintenance: boolean;

  @Column({ type: 'timestamp', nullable: true })
  last_maintenance_at?: Date;

  @CreateDateColumn()
  creatAt: Date;
  
  @UpdateDateColumn()
  updateAt: Date;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}