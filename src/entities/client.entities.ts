
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Address } from "./address.entities";

@Entity('client')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  document: string

  @Column()
  socialReason: string;
  
  @Column()
  fantasyName: string;

  @Column()
  phone: string;
    
  @OneToMany(() => Address, (address) => address.client, { cascade: true, eager: true })
  address: Address[];
    
  @Column({ nullable: true})
  region?: string;
  
  @CreateDateColumn()
  creatAt: Date;
  
  @UpdateDateColumn()
  updateAt: Date;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}