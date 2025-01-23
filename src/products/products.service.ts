import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entities';
import { Repository } from 'typeorm';
import { BarCode } from 'src/entities/barcode.entities';
import { Price } from 'src/entities/price.entities';


@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(BarCode)
    private readonly barcodeRepository: Repository<BarCode>,
    @InjectRepository(Price)
    private readonly priceRepository: Repository<Price>
  ) {}
  async create(createProductDto: CreateProductDto, barCode: string, price: number) {
    const prodExist = await this.productRepository.findOne({
      where: {
        name: createProductDto.name,
      },
    })

    const codeExist = await this.barcodeRepository.findOne({
      where: {
        barCode
      }
    })

    if (prodExist || codeExist) {
      throw new ConflictException('Product already registered.')
    }
    
    const product = await this.productRepository.create({
      ...createProductDto,
      creatAt: new Date(),
    })

    const saveProduct = await this.productRepository.save(product)

    const barcodeEntitie = await this.barcodeRepository.create({
      barCode,
      id_product: product.id
    })

    const saveBarcode = await this.barcodeRepository.save(barcodeEntitie)

    const priceEntitie = await this.priceRepository.create({
      price,
      id_product: product.id
    })

    const savePrice = await this.priceRepository.save(priceEntitie)

    return { product: saveProduct, barcode: barcodeEntitie, price: priceEntitie}
  }

  async findAll() {
    const list = this.productRepository.find({
    relations: ['barcode', 'price'],
  })
    return list
  }

  async findOne(barcode: string) {
    const prodExist = await this.barcodeRepository.findOne({
      where: {
        barCode: barcode
      }
    })

    if (!prodExist) {
      throw new NotFoundException('Product not found.')
    }

    return prodExist

  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
