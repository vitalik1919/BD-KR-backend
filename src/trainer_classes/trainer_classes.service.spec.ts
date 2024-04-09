import { Test, TestingModule } from '@nestjs/testing';
import { TrainerClassesService } from './trainer_classes.service';

describe('TrainerClassesService', () => {
  let service: TrainerClassesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainerClassesService],
    }).compile();

    service = module.get<TrainerClassesService>(TrainerClassesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
