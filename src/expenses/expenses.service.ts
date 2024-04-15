import {Inject, Injectable} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Expense } from './entities/expense.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpensesService {

  constructor(
      @Inject('EXPENSE_REPOSITORY')
      private expenseRepository: Repository<Expense>,
  ) {}

  async findAll(): Promise<Expense[]> {
    return this.expenseRepository.find();
  }

  async findOne(id: number): Promise<Expense | undefined> {
    return this.expenseRepository.findOne({ where: { id: id } });
  }

  async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    return this.expenseRepository.save(createExpenseDto);
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto): Promise<Expense | undefined> {
    await this.expenseRepository.update(id, updateExpenseDto);
    return this.expenseRepository.findOne({ where: { id: id } });
  }

  async remove(id: number): Promise<void> {
    await this.expenseRepository.delete(id);
  }

  async getMonthlyExpenseData() {
    const queryResult = await this.expenseRepository.query(`SELECT getMonthlyExpenseData() AS result`)
    const result = queryResult[0].result
    return JSON.parse(result)
  }
}
