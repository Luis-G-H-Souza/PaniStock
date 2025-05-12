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
    private readonly truckRepository: Repository<Truck>,
  )
  {}
  async create(createTruckDto: CreateTruckDto) {

    const truckExist = await this.truckRepository.findOne({
      where: {
        plate: createTruckDto.plate,
      },
    });
    
    if (truckExist) {
      throw new ConflictException('Truck already registered.');
    }

    const ownership_name = createTruckDto.ownership_type === 'OWNED'
    ? 'PANIBRASIL'
    : createTruckDto.ownership_name;

  const truck = this.truckRepository.create({
    ...createTruckDto,
    ownership_name,
    creatAt: new Date(),
  });

    const saveTruck = await this.truckRepository.save(truck);

    
    return saveTruck;
  }

   async findAll() {
    const list = this.truckRepository.find({
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
