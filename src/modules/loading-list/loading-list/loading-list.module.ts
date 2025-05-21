import { Module } from '@nestjs/common';
import { LoadingListService } from './loading-list.service';
import { LoadingListController } from './loading-list.controller';

@Module({
  controllers: [LoadingListController],
  providers: [LoadingListService],
})
export class LoadingListModule {}
