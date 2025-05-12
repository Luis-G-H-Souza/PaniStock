import { Module } from '@nestjs/common';
import { TruckService } from './truck.service';
import { TruckController } from './truck.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Truck } from 'src/entities/truck.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Truck])],
  controllers: [TruckController],
  providers: [TruckService],
  exports: [TruckService]
})
export class TruckModule {}
