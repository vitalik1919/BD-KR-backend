import {Inject, Injectable} from '@nestjs/common';
import { Repository } from 'typeorm';
import { TrainerClass } from './entities/trainer_class.entity';
import { CreateTrainerClassDto } from './dto/create-trainer_class.dto';
import { UpdateTrainerClassDto } from './dto/update-trainer_class.dto';

@Injectable()
export class TrainerClassesService {

  constructor(
      @Inject('TRAINER_CLASS_REPOSITORY')
      private trainerClassRepository: Repository<TrainerClass>,
  ) {}

  async findAll(): Promise<TrainerClass[]> {
    return this.trainerClassRepository.find();
  }

  async findOne(id: number): Promise<TrainerClass | undefined> {
    return this.trainerClassRepository.findOne({ where: { id: id } });
  }

  async create(createTrainerClassDto: CreateTrainerClassDto): Promise<TrainerClass> {
    return this.trainerClassRepository.save(createTrainerClassDto);
  }

  async update(id: number, updateTrainerClassDto: UpdateTrainerClassDto): Promise<TrainerClass | undefined> {
    await this.trainerClassRepository.update(id, updateTrainerClassDto);
    return this.trainerClassRepository.findOne({ where: { id: id } });
  }

  async remove(id: number): Promise<void> {
    await this.trainerClassRepository.delete(id);
  }
}
