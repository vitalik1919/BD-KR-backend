import { Test, TestingModule } from '@nestjs/testing';
import { BoughtSubscriptionsService } from './bought_subscriptions.service';

describe('BoughtSubscriptionsService', () => {
  let service: BoughtSubscriptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoughtSubscriptionsService],
    }).compile();

    service = module.get<BoughtSubscriptionsService>(BoughtSubscriptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
