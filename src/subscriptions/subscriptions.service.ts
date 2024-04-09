import {Inject, Injectable} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import {CreateSubscriptionDto} from "./dto/create-subscription.dto";
import {UpdateSubscriptionDto} from "./dto/update-subscription.dto";

@Injectable()
export class SubscriptionsService {

  constructor(
      @Inject('SUBSCRIPTION_REPOSITORY')
      private subscriptionRepository: Repository<Subscription>,
  ) {}

  async findAll(): Promise<Subscription[]> {
    return this.subscriptionRepository.find();
  }

  async findOne(id: number): Promise<Subscription | undefined> {
    return this.subscriptionRepository.findOne({where: {id : id}});
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
}
