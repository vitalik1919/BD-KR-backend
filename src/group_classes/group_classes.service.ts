import {Inject, Injectable} from '@nestjs/common';
import { Repository } from 'typeorm';
import { GroupClass } from './entities/group_class.entity';
import { CreateGroupClassDto } from './dto/create-group_class.dto';
import { UpdateGroupClassDto } from './dto/update-group_class.dto';

@Injectable()
export class GroupClassesService {

  constructor(
      @Inject('GROUP_CLASS_REPOSITORY')
      private groupClassRepository: Repository<GroupClass>,
  ) {}

  async findAll(): Promise<GroupClass[]> {
    return this.groupClassRepository.find();
  }

  async findOne(id: number): Promise<GroupClass | undefined> {
    return this.groupClassRepository.findOne({ where: { id: id } });
  }

  async create(createGroupClassDto: CreateGroupClassDto): Promise<GroupClass> {
    return this.groupClassRepository.save(createGroupClassDto);
  }

  async update(id: number, updateGroupClassDto: UpdateGroupClassDto): Promise<GroupClass | undefined> {
    await this.groupClassRepository.update(id, updateGroupClassDto);
    return this.groupClassRepository.findOne({ where: { id: id } });
  }

  async remove(id: number): Promise<void> {
    await this.groupClassRepository.delete(id);
  }
}
