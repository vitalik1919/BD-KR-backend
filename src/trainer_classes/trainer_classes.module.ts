import { Module } from '@nestjs/common';
import { TrainerClassesService } from './trainer_classes.service';
import { TrainerClassesController } from './trainer_classes.controller';

@Module({
  controllers: [TrainerClassesController],
  providers: [TrainerClassesService],
})
export class TrainerClassesModule {}
