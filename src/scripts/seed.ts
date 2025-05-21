// scripts/seed.ts

import { DataSource } from "typeorm";
import { AppDataSource } from "../database/data-source";
import * as fs from "fs";
import * as path from "path";

// Importa as entidades
import { Client } from "../entities/client.entities";
import { Product } from "../entities/product.entities";
import { Truck } from "../entities/truck.entities";
import { Order } from "../entities/order.entities";
import { OrderItem } from "../entities/orderitens.entities";

async function seed() {
  await AppDataSource.initialize();
  console.log("Database connected");

  const clientRepo = AppDataSource.getRepository(Client);
  const productRepo = AppDataSource.getRepository(Product);
  const truckRepo = AppDataSource.getRepository(Truck);
  const orderRepo = AppDataSource.getRepository(Order);
  const orderItemRepo = AppDataSource.getRepository(OrderItem);

  // Carrega JSONs
  const seedPath = path.resolve(__dirname, "../modules/loading-list/seed-data");

  const clients = JSON.parse(fs.readFileSync(path.join(seedPath, "clients.json"), "utf8"));
  const products = JSON.parse(fs.readFileSync(path.join(seedPath, "products.json"), "utf8"));
  const trucks = JSON.parse(fs.readFileSync(path.join(seedPath, "truck.json"), "utf8"));


  // Popula as tabelas
  await clientRepo.save(clients);
  console.log("Clients inserted");

  await productRepo.save(products);
  console.log("Products inserted");

  await truckRepo.save(trucks);
  console.log("Trucks inserted");

  console.log("Orders and Order Items inserted");

  await AppDataSource.destroy();
  console.log("Seeding finished and database connection closed");
}

seed().catch((err) => {
  console.error("Error while seeding:", err);
  process.exit(1);
});
