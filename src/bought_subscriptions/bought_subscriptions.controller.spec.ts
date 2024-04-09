import { Test, TestingModule } from '@nestjs/testing';
import { BoughtSubscriptionsController } from './bought_subscriptions.controller';
import { BoughtSubscriptionsService } from './bought_subscriptions.service';

describe('BoughtSubscriptionsController', () => {
  let controller: BoughtSubscriptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoughtSubscriptionsController],
      providers: [BoughtSubscriptionsService],
    }).compile();

    controller = module.get<BoughtSubscriptionsController>(BoughtSubscriptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
