import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { Price } from 'src/entities/price.entities';
import { Product } from 'src/entities/product.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PricesService {
  constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(Price)
        private readonly barcodeRepository: Repository<Price>
      ) {}
  
  async create(createPriceDto: CreatePriceDto, product: string) {
   if (!product || product.trim() === "" ){
       throw new BadRequestException("Product cannot be empty.");
     }
   
       const prodExist = await this.productRepository.findOne({
             where: {
               name: product,
             },
           })
       
           if (!prodExist) {
             throw new NotFoundException('Product not found.')
           }
  }

  findAll() {
    return `This action returns all prices`;
  }

  findOne(id: number) {
    return `This action returns a #${id} price`;
  }

  update(id: number, updatePriceDto: UpdatePriceDto) {
    return `This action updates a #${id} price`;
  }

  remove(id: number) {
    return `This action removes a #${id} price`;
  }
}
