import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
      @Inject('TRANSACTION_REPOSITORY')
      private transactionRepository: Repository<Transaction>,
  ) {}

  async findAll(): Promise<Transaction[]> {
    return this.transactionRepository.find();
  }

  async findOne(id: number): Promise<Transaction | undefined> {
    return this.transactionRepository.findOne({ where: { id: id } });
  }

  async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    return this.transactionRepository.save(createTransactionDto);
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto): Promise<Transaction | undefined> {
    await this.transactionRepository.update(id, updateTransactionDto);
    return this.transactionRepository.findOne({ where: { id: id } });
  }

  async remove(id: number): Promise<void> {
    await this.transactionRepository.delete(id);
  }
}
