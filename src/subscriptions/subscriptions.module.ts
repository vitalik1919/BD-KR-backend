import { Module } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import {subscriptionsProviders} from "./subscriptions.providers";
import {DatabaseModule} from "../database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [SubscriptionsController],
  providers: [...subscriptionsProviders, SubscriptionsService],
})
export class SubscriptionsModule {}
