import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entities';
import { Repository } from 'typeorm';
import { BarCode } from 'src/entities/barcode.entities';
import { validateDigit1 } from 'src/modules/products/utils/bcodeveri-digit1';
import { validateDigit3 } from 'src/modules/products/utils/bcodeveri-digit3';
import { validateUPCEorEAN8 } from 'src/modules/products/utils/bcodeveri-upce';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(BarCode)
    private readonly barcodeRepository: Repository<BarCode>,
   
  ) {}
  async create(
    createProductDto: CreateProductDto,
    barCode: string,
  ) {
    if (typeof barCode !== 'string') {
      throw new Error(
        `Invalid barcode: Expected string, but got ${typeof barCode}`,
      );
    }

    if (!barCode /*|| barCode.trim() === ""*/) {
      throw new BadRequestException('barCode cannot be empty.');
    }

    let validBCode: boolean;

    if (/^\d{13}$/.test(barCode) || /^\d{14}$/.test(barCode)) {
      validBCode = validateDigit1(barCode);
    } else if (/^\d{12}$/.test(barCode)) {
      validBCode = validateDigit3(barCode);
    } else if (/^\d{8}$/.test(barCode)) {
      validBCode = validateUPCEorEAN8(barCode);
    } else {
      throw new BadRequestException(
        'Invalid barcode format. Must be 8, 12, 13 or 14 digits.',
      );
    }

    if (!validBCode) {
      throw new BadRequestException('Invalid barcode checksum.');
    }

    const prodExist = await this.productRepository.findOne({
      where: {
        name: createProductDto.name,
      },
    });

    const codeExist = await this.barcodeRepository.findOne({
      where: {
        barCode,
      },
    });

    if (prodExist || codeExist) {
      throw new ConflictException('Product already registered.');
    }


    const product = await this.productRepository.create({
      ...createProductDto,
      creatAt: new Date(),
    });

    const saveProduct = await this.productRepository.save(product);

    const barcodeEntitie = await this.barcodeRepository.create({
      barCode,
      id_product: product.id,
      product: saveProduct,
    });
    await this.barcodeRepository.save(barcodeEntitie);

    return {
      product: saveProduct,
      barcode: barcodeEntitie,
  
    };
  }

  async findAll() {
    const list = this.productRepository.find({
      where: { isActive: true },
      relations: ['barcode'],
    });
    return list;
  }

  /*async findOne(barcode: string) {
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
*/

  async searchPorduct(query: { name?: string; barcode?: string}){
  
    const { name, barcode } = query;

    if(!name && !barcode){
      throw new BadRequestException('Enter the name, id or barcode of a product.')
    }

    return this.productRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.barcode', 'barcode')
  
      .where('product.name ILIKE :name', { name: `%${name}%` })
      .orWhere('barcode.barCode ILIKE :barcode', { barcode: `${barcode}%` })
      .orderBy('product.name', 'ASC') // Ordena em ordem alfabética crescente (A-Z)
      .limit(10)
      .getMany();
  }

  async update(barcode: string, updateProductDto: UpdateProductDto) {
    const barcodeExist = await this.barcodeRepository.findOne({
      where: {
        barCode: barcode,
      },
    });

    if (!barcodeExist) {
      throw new NotFoundException('Product not found.');
    }

    const prod = await this.productRepository.findOne({
      where: {
        id: barcodeExist.id_product,
      },
      relations: ['barcode',],
    });

    if (!prod) {
      throw new NotFoundException('Product not found.');
    }

    await this.productRepository.update(prod.id, {
      ...updateProductDto,
      updateAt: new Date(),
    });
    return updateProductDto;
  }

  async remove(barcode: string) {
    const barcodeExist = await this.barcodeRepository.findOne({
      where: {
        barCode: barcode,
      },
    });

    if (!barcodeExist) {
      throw new NotFoundException('Product not found.');
    }

    const prod = await this.productRepository.findOne({
      where: {
        id: barcodeExist.id_product,
      },
      relations: ['barcode',],
    });

    if (!prod) {
      throw new NotFoundException('Product not found.');
    }
    await this.productRepository.update(prod.id, {
      isActive: false,
      updateAt: new Date(),
    });
    return;
  }
}
