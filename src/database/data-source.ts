import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from "typeorm";

import * as dotenv from 'dotenv';
import { User } from "src/entities/user.entities";
import { Product } from "src/entities/product.entities";
import { Sale } from "src/entities/sale.entities";
import { SaleItem } from "src/entities/sales-item.entities";
import { Stock } from "src/entities/stock.entities";
import { StockMoviment } from "src/entities/stock-moviment.entities";
import path from "path";

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT!,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'smoke-track',
  entities: [User, Product, Sale, SaleItem, Stock, StockMoviment],
  synchronize: true,
  migrations: [__dirname + "/../migrations/*.ts"],
  logging: true
}

export const AppDataSource = new DataSource(dataSourceOptions);

@Module({
    imports: [TypeOrmModule.forRootAsync({
        useFactory: async () => {
            return {
                ...dataSourceOptions,
            }
        }
    })]
})
export class DatabaseModule {}
