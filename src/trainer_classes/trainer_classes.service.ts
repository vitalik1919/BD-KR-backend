import {Inject, Injectable} from '@nestjs/common';
import {IsNull, Repository } from 'typeorm';
import { TrainerClass } from './entities/trainer_class.entity';
import { CreateTrainerClassDto } from './dto/create-trainer_class.dto';
import { UpdateTrainerClassDto } from './dto/update-trainer_class.dto';
import {UpdateCustomerDto} from "../customers/dto/update-customer.dto";
import {TrainerClassFilterDTO} from "./dto/TrainerClassFilterDTO";

@Injectable()
export class TrainerClassesService {

  constructor(
      @Inject('TRAINER_CLASS_REPOSITORY')
      private trainerClassRepository: Repository<TrainerClass>,
  ) {}

  async findAll(): Promise<TrainerClass[]> {
    return this.trainerClassRepository.find();
  }

  async findAvailable() : Promise<TrainerClass[]> {
      return this.trainerClassRepository
          .createQueryBuilder('trainerClass')
          .leftJoinAndSelect('trainerClass.trainer', 'trainer')
          .select([
              'trainerClass.id',
              'trainer.first_name', 'trainer.last_name',
              'trainerClass.price', 'trainerClass.start_time',
              'trainerClass.end_time', 'trainerClass.weekdays'])
          .where('trainerClass.customer is null')
          .orderBy('trainerClass.price', 'ASC')
          .addOrderBy('trainer.first_name', 'ASC')
          .addOrderBy('trainerClass.start_time', 'ASC')
          .getRawMany();
  }

  async findOne(id: number): Promise<TrainerClass | undefined> {
    return this.trainerClassRepository.findOne({ where: { id: id } });
  }

  async findAllOfCustomer(customerId: number): Promise<any[]> {
    return this.trainerClassRepository
        .createQueryBuilder('trainerClass')
        .leftJoinAndSelect('trainerClass.trainer', 'trainer')
        .select([
            'trainerClass.id',
            'trainer.first_name', 'trainer.last_name',
            'trainerClass.price', 'trainerClass.start_time',
            'trainerClass.end_time', 'trainerClass.weekdays'])
        .where('trainerClass.customer = :customerId', { customerId })
        .getRawMany();
  }

  async findAllOfTrainer(trainerId: number): Promise<any[]> {
    return this.trainerClassRepository
        .createQueryBuilder('trainerClass')
        .leftJoinAndSelect('trainerClass.customer', 'customer')
        .select([
          'trainerClass.id',
          'customer.first_name', 'customer.last_name',
          'trainerClass.price', 'trainerClass.start_time',
          'trainerClass.end_time', 'trainerClass.weekdays'])
        .where('trainerClass.trainer = :trainerId', { trainerId })
        .andWhere('trainerClass.customerId is not null')
        .getRawMany();
  }
    async findAvailableOfTrainer(trainerId: number): Promise<any[]> {
        return this.trainerClassRepository
            .createQueryBuilder('trainerClass')
            .leftJoinAndSelect('trainerClass.trainer', 'trainer')
            .select([
                'trainerClass.id',
                'trainer.first_name', 'trainer.last_name',
                'trainerClass.price', 'trainerClass.start_time',
                'trainerClass.end_time', 'trainerClass.weekdays'])
            .where('trainerClass.trainer = :trainerId', { trainerId })
            .andWhere('trainerClass.customerId is null')
            .getRawMany();
    }

  async addClassToCustomer(id : number, updateTrainerClassDTO : UpdateTrainerClassDto) {

      const trainerClass = await this.trainerClassRepository.findOne({where: {id: id}});
      if (!trainerClass) {
            throw new Error(`Trainer class with id ${trainerClass.id} not found`);
      }
      trainerClass.customer = updateTrainerClassDTO.customer;
      return this.trainerClassRepository.save(trainerClass);
  }

    async filterClasses(filterDTO: TrainerClassFilterDTO): Promise<TrainerClass[]> {
        const { minPrice, maxPrice, chosenWeekdays, startTime, endTime } = filterDTO;

        let query = this.trainerClassRepository.createQueryBuilder('trainer_class')
            .select([
                'trainer_class.id',
                'trainer.first_name',
                'trainer.last_name',
                'trainer_class.price',
                'trainer_class.start_time',
                'trainer_class.end_time',
                'trainer_class.weekdays'
            ])
            .leftJoin('trainer_class.trainer', 'trainer')
            .where('trainer_class.customer is null');

        if (minPrice !== undefined && maxPrice !== undefined) {
            query = query.andWhere('trainer_class.price BETWEEN :minPrice AND :maxPrice', { minPrice, maxPrice });
        } else if (minPrice !== undefined) {
            query = query.andWhere('trainer_class.price >= :minPrice', { minPrice });
        } else if (maxPrice !== undefined) {
            query = query.andWhere('trainer_class.price <= :maxPrice', { maxPrice });
        }

        if (startTime !== undefined) {
            query = query.andWhere('trainer_class.start_time >= :startTime', { startTime });
        }
        if (endTime !== undefined) {
            query = query.andWhere('trainer_class.end_time <= :endTime', { endTime });
        }

        if (chosenWeekdays && chosenWeekdays.length > 0) {
            const searchConditions = chosenWeekdays.map((day, index) => `JSON_SEARCH(trainer_class.weekdays->"$.weekdays", 'one', :day${index}) IS NOT NULL`).join(' OR ');
            query = query.andWhere(`(${searchConditions})`, chosenWeekdays.reduce((params, day, index) => ({ ...params, [`day${index}`]: day }), {}));
        }

        query.orderBy('trainer_class.price', 'ASC')
             .addOrderBy('trainer.first_name', 'ASC')
             .addOrderBy('trainer_class.start_time', 'ASC')

        return await query.getMany();
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
