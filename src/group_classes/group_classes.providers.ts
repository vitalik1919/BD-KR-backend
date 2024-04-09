import { DataSource } from 'typeorm';
import {GroupClass} from "./entities/group_class.entity";

export const groupClassesProviders = [
    {
        provide: 'GROUP_CLASS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(GroupClass),
        inject: ['DATA_SOURCE'],
    },
];