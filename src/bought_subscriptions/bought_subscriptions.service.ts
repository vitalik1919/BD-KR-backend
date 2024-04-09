import { Injectable } from '@nestjs/common';
import { CreateBoughtSubscriptionDto } from './dto/create-bought_subscription.dto';
import { UpdateBoughtSubscriptionDto } from './dto/update-bought_subscription.dto';

@Injectable()
export class BoughtSubscriptionsService {
  create(createBoughtSubscriptionDto: CreateBoughtSubscriptionDto) {
    return 'This action adds a new boughtSubscription';
  }

  findAll() {
    return `This action returns all boughtSubscriptions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} boughtSubscription`;
  }

  update(id: number, updateBoughtSubscriptionDto: UpdateBoughtSubscriptionDto) {
    return `This action updates a #${id} boughtSubscription`;
  }

  remove(id: number) {
    return `This action removes a #${id} boughtSubscription`;
  }
}
