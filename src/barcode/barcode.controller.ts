import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BarcodeService } from './barcode.service';
import { CreateBarcodeDto } from './dto/create-barcode.dto';
import { UpdateBarcodeDto } from './dto/update-barcode.dto';

@Controller('barcode')
export class BarcodeController {
  constructor(private readonly barcodeService: BarcodeService) {}

  @Post()
  create(
    @Body() createBarcodeDto: CreateBarcodeDto,
    @Body('product') product: string,
  ) {
    return this.barcodeService.create(createBarcodeDto, product);
  }

  @Get(':barcode')
  findOne(@Param('barcode') barcode: string) {
    return this.barcodeService.findOne(barcode);
  }

  @Delete(':barcode')
  remove(@Param('barcode') barcode: string) {
    return this.barcodeService.remove(barcode);
  }
}
