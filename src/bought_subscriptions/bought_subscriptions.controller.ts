import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BoughtSubscriptionsService } from './bought_subscriptions.service';
import { CreateBoughtSubscriptionDto } from './dto/create-bought_subscription.dto';
import { UpdateBoughtSubscriptionDto } from './dto/update-bought_subscription.dto';
import {CreateCustomerDto} from "../customers/dto/create-customer.dto";

@Controller('bought-subscriptions')
export class BoughtSubscriptionsController {
  constructor(private readonly boughtSubscriptionsService: BoughtSubscriptionsService) {}

  @Post()
  create(@Body() createBoughtSubscriptionDto: CreateBoughtSubscriptionDto) {
    return this.boughtSubscriptionsService.create(createBoughtSubscriptionDto);
  }

  @Post('purchase')
  purchaseSubscription(@Body() createBoughtSubDTO : CreateBoughtSubscriptionDto) {
    return this.boughtSubscriptionsService.purchaseSubscription(createBoughtSubDTO)
  }

  @Get('monthly')
  getSubscriptionsBoughtData() {
    return this.boughtSubscriptionsService.getSubscriptionsBoughtData()
  }

  @Get('json')
  getSubscriptionsJSON() {
    return this.boughtSubscriptionsService.getSubscriptionJSON()
  }

  @Get()
  findAll() {
    return this.boughtSubscriptionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boughtSubscriptionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoughtSubscriptionDto: UpdateBoughtSubscriptionDto) {
    return this.boughtSubscriptionsService.update(+id, updateBoughtSubscriptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boughtSubscriptionsService.remove(+id);
  }
}
