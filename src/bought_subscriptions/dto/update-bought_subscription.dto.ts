import { PartialType } from '@nestjs/mapped-types';
import { CreateBoughtSubscriptionDto } from './create-bought_subscription.dto';

export class UpdateBoughtSubscriptionDto extends PartialType(CreateBoughtSubscriptionDto) {}
