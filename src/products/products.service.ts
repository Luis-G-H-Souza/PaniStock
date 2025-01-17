import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entities';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}
  async create(createProductDto: CreateProductDto) {
    const prodExist = await this.productRepository.findOne({
      where: {
        barCode: createProductDto.barCode,
      },
    })

    if (prodExist) {
      throw new ConflictException('Product already registered.')
    }
    
    const product = await this.productRepository.create({
      ...createProductDto,
      creatAt: new Date(),
    })

    return this.productRepository.save(product)
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
