import { Test, TestingModule } from '@nestjs/testing';
import { TrainerClassesController } from './trainer_classes.controller';
import { TrainerClassesService } from './trainer_classes.service';

describe('TrainerClassesController', () => {
  let controller: TrainerClassesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainerClassesController],
      providers: [TrainerClassesService],
    }).compile();

    controller = module.get<TrainerClassesController>(TrainerClassesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
