import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from "typeorm";

import * as dotenv from 'dotenv';
import { User } from "src/entities/user.entities";

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT!,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'smoke-track',
  entities: [User],
  synchronize: true,
  migrations: ['src/migrations/*.ts']
}
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
