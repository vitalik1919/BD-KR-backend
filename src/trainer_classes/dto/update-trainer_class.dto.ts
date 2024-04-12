import { PartialType } from '@nestjs/mapped-types';
import { CreateTrainerClassDto } from './create-trainer_class.dto';
import {Customer} from "../../customers/entities/customer.entity";

export class UpdateTrainerClassDto extends PartialType(CreateTrainerClassDto) {

    customer : Customer
}
