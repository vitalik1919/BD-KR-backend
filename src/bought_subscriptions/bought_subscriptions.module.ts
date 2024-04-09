import { Module } from '@nestjs/common';
import { BoughtSubscriptionsService } from './bought_subscriptions.service';
import { BoughtSubscriptionsController } from './bought_subscriptions.controller';
import {boughtSubscriptionsProviders} from "./bought_subscriptions.providers";

@Module({
  controllers: [BoughtSubscriptionsController],
  providers: [...boughtSubscriptionsProviders, BoughtSubscriptionsService],
})
export class BoughtSubscriptionsModule {}
