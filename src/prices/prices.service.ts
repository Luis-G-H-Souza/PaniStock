import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePriceDto } from './dto/create-price.dto';
import { Price } from 'src/entities/price.entities';
import { Product } from 'src/entities/product.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BarCode } from 'src/entities/barcode.entities';

@Injectable()
export class PricesService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Price)
    private readonly priceRepository: Repository<Price>,
    @InjectRepository(BarCode)
    private readonly barcodeRepository: Repository<BarCode>,
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
      product: prodExist,
      price: validPrice,
      isActive: true,
    });

    await this.priceRepository.save(newPrice);
    return newPrice;
  }

  async findOne(barcode: string) {
    const barcodeExist = await this.barcodeRepository.findOne({
      where: {
        barCode: barcode,
      },
      relations: ['product'],
    });

    if (!barcodeExist || barcodeExist.isActive === false) {
      throw new NotFoundException('Product not found.');
    }

    const prod = await this.productRepository.findOne({
      where: {
        id: barcodeExist.id_product,
      },
      relations: ['barcode', 'price'],
    });

    if (!prod) {
      throw new NotFoundException('Product not found.');
    }

    console.log('Searching for barcode:', barcode);
    console.log('Barcode found:', barcodeExist);
    console.log('Product ID:', barcodeExist.id_product);

    return prod;
  }


  remove(id: number) {
    return `This action removes a #${id} price`;
  }
}
