import {Inject, Injectable} from '@nestjs/common';
import {Protocol} from "./entities/protocol.entity";
import {Repository} from 'typeorm';

@Injectable()
export class ProtocolsService {

    constructor(
        @Inject('PROTOCOL_REPOSITORY')
        private protocolRepository: Repository<Protocol>,
    ) {}
    async getProtocolData(time : number) {

        const protocols = await this.protocolRepository.createQueryBuilder('protocol')
            .select([
                'protocol.id',
                'protocol.action',
                'protocol.date',
                'user.username',
                'subscription.type',
                'ttrainer.first_name',
                'ttrainer.last_name',
                'gtrainer.first_name',
                'gtrainer.last_name'
            ])
            .leftJoin('protocol.user', 'user')
            .leftJoin('protocol.subscription', 'subscription')
            .leftJoin('protocol.trainerClass', 'tclass')
            .leftJoin('tclass.trainer', 'ttrainer')
            .leftJoin('protocol.groupClass', 'gclass')
            .leftJoin('gclass.trainer', 'gtrainer')
            .where(`protocol.date > DATE_SUB(DATE(NOW()), INTERVAL ${time} HOUR)`)
            .andWhere('protocol.date < LAST_DAY(NOW())')
            .getMany();
        if(!protocols)
            throw new Error('Protocols not found !')

        let result : string[] = []
        for(let i = 0; i < protocols.length; ++i) {
            result[i] = protocols[i].date + '. '
            if(protocols[i].user) {
                result[i] += 'User: ' + protocols[i].user.username + '. '
            }
            result[i] += protocols[i].action + '. '
            if(protocols[i].subscription) {
                result[i] += 'Subscription: ' + protocols[i].subscription.type + '. '
            }
            if(protocols[i].trainerClass) {
                result[i] += 'Trainer: ' + protocols[i].trainerClass.trainer.first_name + ' ' +
                    protocols[i].trainerClass.trainer.last_name + '. '
            }
            if(protocols[i].groupClass) {
                result[i] += 'Group Trainer: ' + protocols[i].groupClass.trainer.first_name + ' ' +
                    protocols[i].groupClass.trainer.last_name + '. '
            }
        }

        return result
    }
}
