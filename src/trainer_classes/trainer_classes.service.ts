import { Injectable } from '@nestjs/common';
import { CreateTrainerClassDto } from './dto/create-trainer_class.dto';
import { UpdateTrainerClassDto } from './dto/update-trainer_class.dto';

@Injectable()
export class TrainerClassesService {
  create(createTrainerClassDto: CreateTrainerClassDto) {
    return 'This action adds a new trainerClass';
  }

  findAll() {
    return `This action returns all trainerClasses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trainerClass`;
  }

  update(id: number, updateTrainerClassDto: UpdateTrainerClassDto) {
    return `This action updates a #${id} trainerClass`;
  }

  remove(id: number) {
    return `This action removes a #${id} trainerClass`;
  }
}
