import { Module } from '@nestjs/common';
import { IncomesService } from './incomes.service';
import { IncomesController } from './incomes.controller';
import {incomesProviders} from "./incomes.providers";
import {DatabaseModule} from "../database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [IncomesController],
  providers: [...incomesProviders, IncomesService],
})
export class IncomesModule {}
