import {Inject, Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {BoughtSubscription} from './entities/bought_subscription.entity';
import {CreateBoughtSubscriptionDto} from './dto/create-bought_subscription.dto';
import {UpdateBoughtSubscriptionDto} from './dto/update-bought_subscription.dto';
import {CreateCustomerDto} from "../customers/dto/create-customer.dto";

@Injectable()
export class BoughtSubscriptionsService {

  constructor(
      @Inject('BOUGHT_SUBSCRIPTION_REPOSITORY')
      private boughtSubscriptionRepository: Repository<BoughtSubscription>,
  ) {}

  async findAll(): Promise<BoughtSubscription[]> {
    return this.boughtSubscriptionRepository.find();
  }

  async purchaseSubscription(createBoughtSubDTO : CreateBoughtSubscriptionDto) {

    const existingSubscription =
        await this.boughtSubscriptionRepository.findOne({where: {customer: {id: createBoughtSubDTO.customer.id}, is_active: true}})
    if(!existingSubscription) {
      return this.boughtSubscriptionRepository.save(createBoughtSubDTO)
    }

  }
  async findOne(id: number): Promise<BoughtSubscription | undefined> {
    return this.boughtSubscriptionRepository.findOne({ where: { id: id } });
  }

  async create(createBoughtSubscriptionDto: CreateBoughtSubscriptionDto): Promise<BoughtSubscription> {
    return this.boughtSubscriptionRepository.save(createBoughtSubscriptionDto);
  }

  async update(id: number, updateBoughtSubscriptionDto: UpdateBoughtSubscriptionDto): Promise<BoughtSubscription | undefined> {
    await this.boughtSubscriptionRepository.update(id, updateBoughtSubscriptionDto);
    return this.boughtSubscriptionRepository.findOne({ where: { id: id } });
  }

  async remove(id: number): Promise<void> {
    await this.boughtSubscriptionRepository.delete(id);
  }
}
