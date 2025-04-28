import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateBarcodeDto } from 'src/barcode/dto/create-barcode.dto';


@Controller('product')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @Body() CreateBarcodeDto: CreateBarcodeDto,
  ) {
    return this.productsService.create(
      createProductDto,
      CreateBarcodeDto.barCode
    );
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  /*@Get(':barcode')
  findOne(@Param('barcode') barcode: string) {
    return this.productsService.findOne(barcode);
  }
  */

  @Get('search')
  async searchProduct(@Query() query: {name?: string; barcode?: string }){
    return this.productsService.searchPorduct(query)
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
