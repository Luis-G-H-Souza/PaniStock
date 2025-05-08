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


@Controller('product')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productsService.create(
      createProductDto
    );
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }


  @Get('search')
  async searchProduct(@Query() query: {name?: string;}){
    return this.productsService.searchPorduct(query)
  }

  @Patch(':id')
  update(
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(updateProductDto);
  }

  @Delete(':id')
   remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
