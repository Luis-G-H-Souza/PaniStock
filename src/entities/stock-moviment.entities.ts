import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum StockFunction {
  ENTRY = 'entry',
  EXIT = 'exit',
}

Entity('stock-moviment');
export class StockMoviment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: StockFunction,
  })
  moviment: StockFunction;

  @Column()
  date: Date;

  @CreateDateColumn()
  creatAt: Date;
}
