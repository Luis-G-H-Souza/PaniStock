import { ConflictException, Injectable } from '@nestjs/common';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { Truck } from 'src/entities/truck.entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TruckService {
  constructor(
    @InjectRepository(Truck)
    private readonly productRepository: Repository<Truck>,
  )
  {}
  async create(createTruckDto: CreateTruckDto) {

    const truckExist = await this.productRepository.findOne({
      where: {
        plate: createTruckDto.plate,
      },
    });
    
    if (truckExist) {
      throw new ConflictException('Product already registered.');
    }

    if (createTruckDto.ownership_type == 'OWNED'){
      createTruckDto.ownership_name = 'PANIBRASIL'
    }

    const truck = await this.productRepository.create({
      ...createTruckDto,
      created_at: new Date(),
    });

    const saveTruck = await this.productRepository.save(truck);

    
    return saveTruck;
  }

   async findAll() {
    const list = this.productRepository.find({
      where: { isActive: true },
    });
    return list;
  }

  findOne(id: number) {
    return `This action returns a #${id} truck`;
  }

  update(id: number, updateTruckDto: UpdateTruckDto) {
    return `This action updates a #${id} truck`;
  }

  remove(id: number) {
    return `This action removes a #${id} truck`;
  }
}
