import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import {transactionProviders} from "./transactions.providers";

@Module({
  controllers: [TransactionsController],
  providers: [...transactionProviders, TransactionsService],
})
export class TransactionsModule {}
