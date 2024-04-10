import { Module } from '@nestjs/common';
import { TrainerClassesService } from './trainer_classes.service';
import { TrainerClassesController } from './trainer_classes.controller';
import {trainerClassesProviders} from "./trainer_classes.providers";
import {DatabaseModule} from "../database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [TrainerClassesController],
  providers: [...trainerClassesProviders, TrainerClassesService],
})
export class TrainerClassesModule {}
