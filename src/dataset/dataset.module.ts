import { Module } from '@nestjs/common';
import { DatasetService } from './dataset.service';
import { DatasetController } from './dataset.controller';
import {categoriesProviders} from "../categories/categories.providers";
import {reviewsProviders} from "../reviews/reviews.providers";
import {subscriptionsProviders} from "../subscriptions/subscriptions.providers";
import {DatabaseModule} from "../database/database.module";
import {userProviders} from "../users/users.providers";
import {customersProviders} from "../customers/customers.providers";
import {adminsProviders} from "../admins/admins.providers";
import {trainersProviders} from "../trainers/trainers.providers";
import {groupClassesProviders} from "../group_classes/group_classes.providers";
import {trainerClassesProviders} from "../trainer_classes/trainer_classes.providers";
import {transactionProviders} from "../transactions/transactions.providers";
import {boughtSubscriptionsProviders} from "../bought_subscriptions/bought_subscriptions.providers";
import {incomesProviders} from "../incomes/incomes.providers";
import {expensesProviders} from "../expenses/expenses.providers";

@Module({
  imports: [DatabaseModule],
  controllers: [DatasetController],
  providers: [...userProviders, ...customersProviders, ...adminsProviders, ...trainersProviders,
    ...groupClassesProviders, ...categoriesProviders, ...reviewsProviders, ...subscriptionsProviders,
    ...trainerClassesProviders, ...transactionProviders, ...boughtSubscriptionsProviders,
    ...incomesProviders, ...expensesProviders, DatasetService],
})
export class DatasetModule {}

