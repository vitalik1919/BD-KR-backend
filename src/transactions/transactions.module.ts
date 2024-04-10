import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import {transactionProviders} from "./transactions.providers";
import {DatabaseModule} from "../database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [TransactionsController],
  providers: [...transactionProviders, TransactionsService],
})
export class TransactionsModule {}
