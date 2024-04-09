import { DataSource } from 'typeorm';
import {BoughtSubscription} from "./entities/bought_subscription.entity";

export const boughtSubscriptionsProviders = [
    {
        provide: 'BOUGHT_SUBSCRIPTION_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(BoughtSubscription),
        inject: ['DATA_SOURCE'],
    },
];