import { CreateBarcodeDto } from './dto/create-barcode.dto';
import { UpdateBarcodeDto } from './dto/update-barcode.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entities';
import { BarCode } from 'src/entities/barcode.entities';
import { Repository } from 'typeorm';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { validateDigit1 } from 'src/products/utils/bcodeveri-digit1';
import { validateDigit3 } from 'src/products/utils/bcodeveri-digit3';
import { validateUPCEorEAN8 } from 'src/products/utils/bcodeveri-upce';

@Injectable()
export class BarcodeService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(BarCode)
    private readonly barcodeRepository: Repository<BarCode>,
  ) {}

  async create(createBarcodeDto: CreateBarcodeDto, products: string) {
    if (!products || products.trim() === '') {
      throw new BadRequestException('Product cannot be empty.');
    }

    const prodExist = await this.productRepository.findOne({
      where: {
        name: products,
      },
    });

    if (!prodExist) {
      throw new NotFoundException('Product not found.');
    }
    const barcodeExist = await this.barcodeRepository.findOne({
      where: {
        barCode: createBarcodeDto.barCode,
      },
    });

    if (barcodeExist) {
      throw new ConflictException('Product already registered.');
    }

    if (!createBarcodeDto.barCode || createBarcodeDto.barCode.trim() === '') {
      throw new BadRequestException('Barcode cannot be empty.');
    }
    let validBCode;
    if (
      /^\d{13}$/.test(createBarcodeDto.barCode) ||
      /^\d{12}$/.test(createBarcodeDto.barCode)
    ) {
      validBCode = validateDigit1(createBarcodeDto.barCode);
    } else if (/^\d{14}$/.test(createBarcodeDto.barCode)) {
      validBCode = validateDigit3(createBarcodeDto.barCode);
    } else if (/^\d{8}$/.test(createBarcodeDto.barCode)) {
      validBCode = validateUPCEorEAN8(createBarcodeDto.barCode);
    } else {
      throw new BadRequestException(
        'Invalid barcode format. Must be 8, 12, 13 or 14 digits.',
      );
    }
    if (!validBCode) {
      throw new BadRequestException('Invalid barcode checksum.');
    }
    const barcode = await this.barcodeRepository.create({
      ...createBarcodeDto,
      product: prodExist,
      creatAt: new Date(),
      id_product: prodExist.id,
    });

    const saveBarcode = await this.barcodeRepository.save(barcode);

    return { product: prodExist, barcode: saveBarcode };
  }

  findAll() {
    return `This action returns all barcode`;
  }

  findOne(id: number) {
    return `This action returns a #${id} barcode`;
  }

  update(id: number, UpdateBarcodeDto: UpdateBarcodeDto) {
    return `This action updates a #${id} barcode`;
  }

  remove(id: number) {
    return `This action removes a #${id} barcode`;
  }
}
