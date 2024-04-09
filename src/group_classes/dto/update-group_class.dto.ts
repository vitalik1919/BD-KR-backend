import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupClassDto } from './create-group_class.dto';

export class UpdateGroupClassDto extends PartialType(CreateGroupClassDto) {}
