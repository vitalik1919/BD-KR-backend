import { DataSource } from 'typeorm';
import { Subscription } from './entities/subscription.entity';

export const subscriptionsProviders = [
    {
        provide: 'SUBSCRIPTION_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Subscription),
        inject: ['DATA_SOURCE'],
    },
];