import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    private readonly priceRepository: Repository<Price>,
  ) {}

  async create(createPriceDto: CreatePriceDto, product: string) {
    if (!product || product.trim() === '') {
      throw new BadRequestException('Product cannot be empty.');
    }

    const prodExist = await this.productRepository.findOne({
      where: {
        name: product,
      },
    });

    if (!prodExist) {
      throw new NotFoundException('Product not found.');
    }

    const validPrice = createPriceDto.price ?? 0;

    if (validPrice <= 0) {
      throw new BadRequestException(
        'The price cannot be negative, null or empty.',
      );
    }

    const prices = await this.priceRepository.find({
      where: {
        id_product: prodExist.id,
      },
    });

    if (prices.length > 0) {
      prices.forEach(async (price) => {
        price.isActive = false;
        await this.priceRepository.save(price);
      });
    }
    const newPrice = this.priceRepository.create({
      id_product: prodExist.id,
      price: validPrice,
      isActive: true,
    });

    await this.priceRepository.save(newPrice);
    return newPrice;
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
