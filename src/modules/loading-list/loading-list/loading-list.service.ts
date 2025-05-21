import { Injectable } from '@nestjs/common';
import { CreateLoadingListDto } from './dto/create-loading-list.dto';
import { UpdateLoadingListDto } from './dto/update-loading-list.dto';

@Injectable()
export class LoadingListService {
  create(createLoadingListDto: CreateLoadingListDto) {
    return 'This action adds a new loadingList';
  }

  findAll() {
    return `This action returns all loadingList`;
  }

  findOne(id: number) {
    return `This action returns a #${id} loadingList`;
  }

  update(id: number, updateLoadingListDto: UpdateLoadingListDto) {
    return `This action updates a #${id} loadingList`;
  }

  remove(id: number) {
    return `This action removes a #${id} loadingList`;
  }
}
