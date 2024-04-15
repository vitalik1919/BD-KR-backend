import {Inject, Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {Income} from './entities/income.entity';
import {CreateIncomeDto} from './dto/create-income.dto';
import {UpdateIncomeDto} from './dto/update-income.dto';

@Injectable()
export class IncomesService {

  constructor(
      @Inject('INCOME_REPOSITORY')
      private incomeRepository: Repository<Income>,
  ) {}

  async getMonthlyIncomeData() {

    const queryResult = await this.incomeRepository.query(`SELECT getMonthlyIncomeData() AS result`)
    const result = queryResult[0].result
    return JSON.parse(result)
  }

  async findAll(): Promise<Income[]> {
    return this.incomeRepository.find();
  }

  async findOne(id: number): Promise<Income | undefined> {
    return this.incomeRepository.findOne({ where: { id: id } });
  }

  async create(createIncomeDto: CreateIncomeDto): Promise<Income> {
    return this.incomeRepository.save(createIncomeDto);
  }

  async update(id: number, updateIncomeDto: UpdateIncomeDto): Promise<Income | undefined> {
    await this.incomeRepository.update(id, updateIncomeDto);
    return this.incomeRepository.findOne({ where: { id: id } });
  }

  async remove(id: number): Promise<void> {
    await this.incomeRepository.delete(id);
  }
}
