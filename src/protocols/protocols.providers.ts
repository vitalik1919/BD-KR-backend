import { DataSource } from 'typeorm';
import {Protocol} from "./entities/protocol.entity";

export const protocolsProviders = [
    {
        provide: 'PROTOCOL_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Protocol),
        inject: ['DATA_SOURCE'],
    },
];