import { Test, TestingModule } from '@nestjs/testing';
import { GroupClassesService } from './group_classes.service';

describe('GroupClassesService', () => {
  let service: GroupClassesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupClassesService],
    }).compile();

    service = module.get<GroupClassesService>(GroupClassesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
