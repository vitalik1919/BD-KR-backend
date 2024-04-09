import { Injectable } from '@nestjs/common';
import { CreateGroupClassDto } from './dto/create-group_class.dto';
import { UpdateGroupClassDto } from './dto/update-group_class.dto';

@Injectable()
export class GroupClassesService {
  create(createGroupClassDto: CreateGroupClassDto) {
    return 'This action adds a new groupClass';
  }

  findAll() {
    return `This action returns all groupClasses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} groupClass`;
  }

  update(id: number, updateGroupClassDto: UpdateGroupClassDto) {
    return `This action updates a #${id} groupClass`;
  }

  remove(id: number) {
    return `This action removes a #${id} groupClass`;
  }
}
