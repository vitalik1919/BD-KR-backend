import { DataSource } from 'typeorm';
import {Expense} from "./entities/expense.entity";

export const expensesProviders = [
    {
        provide: 'EXPENSE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Expense),
        inject: ['DATA_SOURCE'],
    },
];