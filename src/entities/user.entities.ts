import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Sale } from "./sale.entities";
import { Stock } from "./stock.entities";

export enum UserFunction {
  ADMIN = 'admin',
  SALES = 'sales',
  STOCK = 'stock',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({
    type: 'enum',
    enum: UserFunction,
  })
  function: UserFunction 

  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updateAt: Date

  @OneToMany(() => Sale, (sale) => sale.user_id)
  sales: Sale[]

  @OneToMany(() => Stock, (stock) => stock.user_id)
  stock: Stock[]

}