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
    return await this.groupClassRepository
        .createQueryBuilder('group_class')
        .leftJoinAndSelect('group_class.trainer', 'trainer')
        .select([
          'group_class.id AS groupClass_id',
          'group_class.type AS groupClass_type',
          'group_class.price AS groupClass_price',
          'group_class.start_time AS groupClass_start_time',
          'group_class.day AS groupClass_day',
          'trainer.first_name AS trainer_first_name',
          'trainer.last_name AS trainer_last_name',
          'group_class.space_left AS groupClass_space_left'
        ])
        .where('group_class.space_left > 0')
        .getRawMany();
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
