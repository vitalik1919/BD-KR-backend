import { DataSource } from 'typeorm';
import {Income} from "./entities/income.entity";

export const incomesProviders = [
    {
        provide: 'INCOME_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Income),
        inject: ['DATA_SOURCE'],
    },
];