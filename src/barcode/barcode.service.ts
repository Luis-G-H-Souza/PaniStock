import { CreateBarcodeDto } from './dto/create-barcode.dto';
import { UpdateBarcodeDto } from './dto/update-barcode.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entities';
import { BarCode } from 'src/entities/barcode.entities';
import { Repository } from 'typeorm';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class BarcodeService {
  constructor(
      @InjectRepository(Product)
      private readonly productRepository: Repository<Product>,
      @InjectRepository(BarCode)
      private readonly barcodeRepository: Repository<BarCode>
    ) {}

  async create(createBarcodeDto: CreateBarcodeDto, product: string) {

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
    const barcodeExist = await this.barcodeRepository.findOne({
      where:{
        barCode: createBarcodeDto.barCode
      }
    })

    if (barcodeExist) {
          throw new ConflictException('Product already registered.')
        }

    const barcode = await this.barcodeRepository.create({
      ...createBarcodeDto,
      id_product: prodExist.id,
      creatAt: new Date()
      
    })

    const saveBarcode = await this.barcodeRepository.save(barcode)

    return { product: prodExist, barcode: saveBarcode}
  }

  findAll() {
    return `This action returns all barcode`;
  }

  findOne(id: number) {
    return `This action returns a #${id} barcode`;
  }

  update(id: number, updateBarcodeDto: UpdateBarcodeDto) {
    return `This action updates a #${id} barcode`;
  }

  remove(id: number) {
    return `This action removes a #${id} barcode`;
  }
}
