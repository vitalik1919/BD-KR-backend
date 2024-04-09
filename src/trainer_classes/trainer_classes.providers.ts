import { DataSource } from 'typeorm';
import {TrainerClass} from "./entities/trainer_class.entity";

export const trainerClassesProviders = [
    {
        provide: 'TRAINER_CLASS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(TrainerClass),
        inject: ['DATA_SOURCE'],
    },
];