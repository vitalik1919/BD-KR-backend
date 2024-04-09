import { Module } from '@nestjs/common';
import { TrainersService } from './trainers.service';
import { TrainersController } from './trainers.controller';
import {trainersProviders} from "./trainers.providers";
import {DatabaseModule} from "../database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [TrainersController],
  providers: [...trainersProviders, TrainersService],
})
export class TrainersModule {}
