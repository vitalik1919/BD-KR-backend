import { DataSource } from 'typeorm';
import {User} from "../users/entities/user.entity";
import {Customer} from "../customers/entities/customer.entity";
import {Subscription} from "../subscriptions/entities/subscription.entity";
import {Trainer} from "../trainers/entities/trainer.entity";
import {Admin} from "../admins/entities/admin.entity";
import {BoughtSubscription} from "../bought_subscriptions/entities/bought_subscription.entity";
import {TrainerClass} from "../trainer_classes/entities/trainer_class.entity";
import {GroupClass} from "../group_classes/entities/group_class.entity";
import {Transaction} from "../transactions/entities/transaction.entity";
import {Category} from "../categories/entities/category.entity";
import {Review} from "../reviews/entities/review.entity";
import {Expense} from "../expenses/entities/expense.entity";
import {Income} from "../incomes/entities/income.entity";
import {Protocol} from "../protocols/entities/protocol.entity";

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'Barnie2019',
                database: 'course_work_gym',
                entities: [
                    User, Customer, Admin, Trainer, Subscription,
                    BoughtSubscription, TrainerClass, GroupClass,
                    Transaction, Review, Category, Expense, Income, Protocol
                ],
                synchronize: true,
            });

            return dataSource.initialize();
        },
    },
];