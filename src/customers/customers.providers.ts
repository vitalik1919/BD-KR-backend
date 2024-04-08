import { DataSource } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

export const customersProviders = [
    {
        provide: 'CUSTOMER_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
        inject: ['DATA_SOURCE'],
    },
];