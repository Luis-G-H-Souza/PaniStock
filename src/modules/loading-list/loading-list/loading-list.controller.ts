import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoadingListService } from './loading-list.service';
import { CreateLoadingListDto } from './dto/create-loading-list.dto';
import { UpdateLoadingListDto } from './dto/update-loading-list.dto';

@Controller('loading-list')
export class LoadingListController {
  constructor(private readonly loadingListService: LoadingListService) {}

  @Post()
  create(@Body() createLoadingListDto: CreateLoadingListDto) {
    return this.loadingListService.create(createLoadingListDto);
  }

  @Get()
  findAll() {
    return this.loadingListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loadingListService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoadingListDto: UpdateLoadingListDto) {
    return this.loadingListService.update(+id, updateLoadingListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loadingListService.remove(+id);
  }
}
