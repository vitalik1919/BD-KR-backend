import { DataSource } from 'typeorm';
import {User} from "../users/entities/user.entity";
import {Customer} from "../customers/entities/customer.entity";
import {Subscription} from "../subscriptions/entities/subscription.entity";
import {Trainer} from "../trainers/entities/trainer.entity";
import {Admin} from "../admins/entities/admin.entity";

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
                    User, Customer, Admin, Trainer, Subscription
                ],
                synchronize: true,
            });

            return dataSource.initialize();
        },
    },
];