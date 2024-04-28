import { Module } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import {subscriptionsProviders} from "./subscriptions.providers";
import {DatabaseModule} from "../database/database.module";
import {boughtSubscriptionsProviders} from "../bought_subscriptions/bought_subscriptions.providers";

@Module({
  imports: [DatabaseModule],
  controllers: [SubscriptionsController],
  providers: [...subscriptionsProviders, ...boughtSubscriptionsProviders, SubscriptionsService],
})
export class SubscriptionsModule {}
