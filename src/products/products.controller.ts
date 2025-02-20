import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateBarcodeDto } from 'src/barcode/dto/create-barcode.dto';
import { CreatePriceDto } from 'src/prices/dto/create-price.dto';

@Controller('product')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @Body() CreateBarcodeDto: CreateBarcodeDto,
    @Body() CreatePriceDto: CreatePriceDto,
  ) {
    return this.productsService.create(
      createProductDto,
      CreateBarcodeDto.barCode,
      CreatePriceDto.price,
    );
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':barcode')
  findOne(@Param('barcode') barcode: string) {
    return this.productsService.findOne(barcode);
  }

  @Patch(':barcode')
  update(
    @Param('barcode') barcode: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(barcode, updateProductDto);
  }

  @Delete(':barcode')
  remove(@Param('barcode') barcode: string) {
    return this.productsService.remove(barcode);
  }
}
