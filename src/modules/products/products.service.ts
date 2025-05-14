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
import { validateDigit1 } from 'src/modules/products/utils/bcodeveri-digit1';
import { validateDigit3 } from 'src/modules/products/utils/bcodeveri-digit3';
import { validateUPCEorEAN8 } from 'src/modules/products/utils/bcodeveri-upce';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
   
  ) {}
  async create(
    createProductDto: CreateProductDto
  ) {
    

    let validBCode: boolean;

    if (/^\d{13}$/.test(createProductDto.barCode) || /^\d{14}$/.test(createProductDto.barCode)) {
      validBCode = validateDigit1(createProductDto.barCode);
    } else if (/^\d{12}$/.test(createProductDto.barCode)) {
      validBCode = validateDigit3(createProductDto.barCode);
    } else if (/^\d{8}$/.test(createProductDto.barCode)) {
      validBCode = validateUPCEorEAN8(createProductDto.barCode);
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
        barCode: createProductDto.barCode,
      },
    });


    if (prodExist) {
      throw new ConflictException('Product already registered.');
    }


    const product = this.productRepository.create({
      ...createProductDto,
      createdAt: new Date(),
    });

    const saveProduct = await this.productRepository.save(product);

    return {
      message: 'Product created successfully',
      product: saveProduct
    };
  }

  async findAll() {
    const list = this.productRepository.find({
      where: { isActive: true }
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

  async update(updateProductDto: UpdateProductDto) {

  }

  async remove(barcode: string) {
    return;
  }
}
