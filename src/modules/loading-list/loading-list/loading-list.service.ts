import { Injectable } from '@nestjs/common';
import { CreateLoadingListDto } from './dto/create-loading-list.dto';
import { UpdateLoadingListDto } from './dto/update-loading-list.dto';
import { LoadingList } from 'src/entities/loadinglist.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LoadingListService {
  constructor(
      @InjectRepository(LoadingList)
      private readonly loadinglistRepository: Repository<LoadingList>,
  ) {}
  create(createLoadingListDto: CreateLoadingListDto) {
    return 'This action adds a new loadingList';
  }

  async findAll() {
    const list = this.loadinglistRepository.find({
      where: {
        isActive: true,
      }
    });
    return list;
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
