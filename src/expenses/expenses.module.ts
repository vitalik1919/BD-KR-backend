import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import {expensesProviders} from "./expenses.providers";

@Module({
  controllers: [ExpensesController],
  providers: [...expensesProviders, ExpensesService],
})
export class ExpensesModule {}
