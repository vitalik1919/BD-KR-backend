import { Module } from '@nestjs/common';
import { TrainerClassesService } from './trainer_classes.service';
import { TrainerClassesController } from './trainer_classes.controller';
import {trainerClassesProviders} from "./trainer_classes.providers";

@Module({
  controllers: [TrainerClassesController],
  providers: [...trainerClassesProviders, TrainerClassesService],
})
export class TrainerClassesModule {}
