import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.dto';
import {GroupClass} from "../../group_classes/entities/group_class.entity";

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
    groupClass: GroupClass;
}
