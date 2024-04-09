import { Module } from '@nestjs/common';
import { BoughtSubscriptionsService } from './bought_subscriptions.service';
import { BoughtSubscriptionsController } from './bought_subscriptions.controller';

@Module({
  controllers: [BoughtSubscriptionsController],
  providers: [BoughtSubscriptionsService],
})
export class BoughtSubscriptionsModule {}
