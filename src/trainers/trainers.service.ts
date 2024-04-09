import {Inject, Injectable} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Trainer } from './entities/trainer.entity';
import {CreateTrainerDto} from "./dto/create-trainer.dto";
import {UpdateTrainerDto} from "./dto/update-trainer.dto";

@Injectable()
export class TrainersService {

  constructor(
      @Inject('TRAINER_REPOSITORY')
      private trainerRepository: Repository<Trainer>,
  ) {}

  async findAll(): Promise<Trainer[]> {
    return this.trainerRepository.find();
  }

  async findOne(id: number): Promise<Trainer | undefined> {
    return this.trainerRepository.findOne({where: { id: id}});
  }

  async create(createTrainerDto: CreateTrainerDto): Promise<Trainer> {
    return this.trainerRepository.save(createTrainerDto);
  }

  async update(id: number, updateTrainerDto: UpdateTrainerDto): Promise<Trainer | undefined> {
    await this.trainerRepository.update(id, updateTrainerDto);
    return this.trainerRepository.findOne({where: { id: id}});
  }

  async remove(id: number): Promise<void> {
    await this.trainerRepository.delete(id);
  }
}
