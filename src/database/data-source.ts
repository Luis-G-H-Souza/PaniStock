import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

import * as dotenv from 'dotenv';
import { User } from 'src/entities/user.entities';
import { Product } from 'src/entities/product.entities';
import { Truck } from 'src/entities/truck.entities';
import { Client } from 'src/entities/client.entities';
import { Address } from 'src/entities/address.entities';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT!,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'smoke-track',
  entities: [__dirname + '/../**/*.entities.{ts,js}'],
  synchronize: true,
  migrations: [__dirname + '/../migrations/*.ts'],
  logging: true,
  dropSchema: true,
};

export const AppDataSource = new DataSource(dataSourceOptions);

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return {
          ...dataSourceOptions,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
