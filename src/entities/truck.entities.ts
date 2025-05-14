import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LoadingList } from './loadinglist.entities';


export enum CapacityType {
  BOXES = 'BOXES',
  PALLETS = 'PALLETS',
}

export enum OwnershipType {
  OWNED = 'OWNED',
  CLIENT = 'CLIENT',
  CARRIER = 'CARRIER',
}

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

  @Column({ type: 'enum', enum: CapacityType})
  type_capacity: CapacityType;

  @Column()
  capacity: number;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'enum', enum: OwnershipType, default: 'OWNED' })
  ownership_type: OwnershipType;

  @Column({ nullable: true })
  ownership_name?: string;

  @Column({ type: 'boolean', default: false })
  in_maintenance: boolean;

  @Column({ type: 'timestamp', nullable: true })
  last_maintenance_at?: Date;

  @OneToOne(() => LoadingList, (loadinglist) => loadinglist.truck, { nullable: true })
  loadinglist: LoadingList

  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}