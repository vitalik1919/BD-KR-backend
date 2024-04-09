import { Module } from '@nestjs/common';
import { IncomesService } from './incomes.service';
import { IncomesController } from './incomes.controller';
import {incomesProviders} from "./incomes.providers";

@Module({
  controllers: [IncomesController],
  providers: [...incomesProviders, IncomesService],
})
export class IncomesModule {}
