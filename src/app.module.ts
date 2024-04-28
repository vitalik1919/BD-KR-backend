import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import {DatabaseModule} from "./database/database.module";
import { CustomersModule } from './customers/customers.module';
import { AuthModule } from './auth/auth.module';
import { TrainersModule } from './trainers/trainers.module';
import { AdminsModule } from './admins/admins.module';
import { TrainerClassesModule } from './trainer_classes/trainer_classes.module';
import { GroupClassesModule } from './group_classes/group_classes.module';
import { ReviewsModule } from './reviews/reviews.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { BoughtSubscriptionsModule } from './bought_subscriptions/bought_subscriptions.module';
import { TransactionsModule } from './transactions/transactions.module';
import { CategoriesModule } from './categories/categories.module';
import { ExpensesModule } from './expenses/expenses.module';
import { IncomesModule } from './incomes/incomes.module';
import { DatasetModule } from './dataset/dataset.module';
import { ProtocolsModule } from './protocols/protocols.module';
@Module({
  imports: [UsersModule, CustomersModule, DatabaseModule,
            AuthModule, TrainersModule, AdminsModule,
            TrainerClassesModule, GroupClassesModule, ReviewsModule,
            SubscriptionsModule, BoughtSubscriptionsModule, TransactionsModule,
            CategoriesModule, ExpensesModule, IncomesModule, DatasetModule, ProtocolsModule],
})
export class AppModule {}
