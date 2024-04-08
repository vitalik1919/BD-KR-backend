import { DataSource } from 'typeorm';
import {User} from "../users/entities/user.entity";
import {Customer} from "../customers/entities/customer.entity";

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
                    User, Customer
                ],
                synchronize: true,
            });

            return dataSource.initialize();
        },
    },
];