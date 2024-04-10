import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import {expensesProviders} from "./expenses.providers";
import {DatabaseModule} from "../database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [ExpensesController],
  providers: [...expensesProviders, ExpensesService],
})
export class ExpensesModule {}
