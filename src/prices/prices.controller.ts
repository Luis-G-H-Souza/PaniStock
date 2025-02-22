import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PricesService } from './prices.service';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';

@Controller('price')
export class PricesController {
  constructor(private readonly pricesService: PricesService) {}

  @Post()
  create(
    @Body() createPriceDto: CreatePriceDto,
    @Body('product') product: string,
  ) {
    return this.pricesService.create(createPriceDto, product);
  }
/*
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pricesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pricesService.remove(+id);
  }
    */
}
