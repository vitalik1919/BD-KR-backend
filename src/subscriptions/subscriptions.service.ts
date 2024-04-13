import {Inject, Injectable} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import {CreateSubscriptionDto} from "./dto/create-subscription.dto";
import {UpdateSubscriptionDto} from "./dto/update-subscription.dto";
import {BoughtSubscription} from "../bought_subscriptions/entities/bought_subscription.entity";
import {SubscriptionsFilterDTO} from "./dto/subscriptionsFilterDTO";

@Injectable()
export class SubscriptionsService {

  constructor(
      @Inject('SUBSCRIPTION_REPOSITORY')
      private subscriptionRepository: Repository<Subscription>,
  ) {}

  async findAll(): Promise<Subscription[]> {
    return this.subscriptionRepository.createQueryBuilder('subscription')
        .orderBy('subscription.price', 'ASC')
        .addOrderBy('subscription.start_time', 'ASC')
        .getMany();
  }

  async findOne(id: number): Promise<Subscription | undefined> {
    return this.subscriptionRepository.findOne({where: {id : id}});
  }

  async findCustomerSub(customerId : number) {
    return await this.subscriptionRepository
        .createQueryBuilder('subscription')
        .innerJoin('subscription.boughtSubs', 'bought_sub')
        .where('bought_sub.customerId = :customerId', { customerId })
        .andWhere('bought_sub.is_active = :is_active', { is_active: true })
        .select('subscription.type')
        .getRawOne();
  }

  async create(createSubscriptionDto: CreateSubscriptionDto): Promise<Subscription> {
    return this.subscriptionRepository.save(createSubscriptionDto);
  }

  async update(id: number, updateSubscriptionDto: UpdateSubscriptionDto): Promise<Subscription | undefined> {
    await this.subscriptionRepository.update(id, updateSubscriptionDto);
    return this.subscriptionRepository.findOne({where: {id : id}});
  }

  async remove(id: number): Promise<void> {
    await this.subscriptionRepository.delete(id);
  }

  async filterSubscriptions(filterDTO: SubscriptionsFilterDTO) {

    const {minPrice, maxPrice, daysAmount, startTime, endTime} = filterDTO;

    let query = this.subscriptionRepository.createQueryBuilder('subscription')

    if (minPrice !== undefined && maxPrice !== undefined) {
      query = query.andWhere('subscription.price BETWEEN :minPrice AND :maxPrice', {minPrice, maxPrice});
    } else if (minPrice !== undefined) {
      query = query.andWhere('subscription.price >= :minPrice', {minPrice});
    } else if (maxPrice !== undefined) {
      query = query.andWhere('subscription.price <= :maxPrice', {maxPrice});
    }

    if (startTime !== undefined) {
      query = query.andWhere('subscription.start_time >= :startTime', {startTime});
    }
    if (endTime !== undefined) {
      query = query.andWhere('subscription.end_time <= :endTime', {endTime});
    }

    if (daysAmount && daysAmount.length > 0) {
      const conditions = daysAmount.map((day, index) => `FIND_IN_SET(:day${index}, subscription.days)`).join(' OR ');
      query = query.andWhere(`(${conditions})`, daysAmount.reduce((params, day, index) => ({ ...params, [`day${index}`]: day }), {}));
    }

    return await query.getMany();

  }

}
