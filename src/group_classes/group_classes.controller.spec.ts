import { Test, TestingModule } from '@nestjs/testing';
import { GroupClassesController } from './group_classes.controller';
import { GroupClassesService } from './group_classes.service';

describe('GroupClassesController', () => {
  let controller: GroupClassesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupClassesController],
      providers: [GroupClassesService],
    }).compile();

    controller = module.get<GroupClassesController>(GroupClassesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
