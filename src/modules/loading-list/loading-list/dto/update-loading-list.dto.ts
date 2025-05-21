import { PartialType } from '@nestjs/swagger';
import { CreateLoadingListDto } from './create-loading-list.dto';

export class UpdateLoadingListDto extends PartialType(CreateLoadingListDto) {}
