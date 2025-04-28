import { Client } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

async function createDatabase() {
  const client = new Client({
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT!,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'postgres',
  });

  try {
    await client.connect();
    await client.query('CREATE DATABASE "panistock";');
    console.log('Database panistock criado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar o banco de dados:', error);
  } finally {
    await client.end();
  }
}

createDatabase();
