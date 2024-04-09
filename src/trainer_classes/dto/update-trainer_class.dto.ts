import { PartialType } from '@nestjs/mapped-types';
import { CreateTrainerClassDto } from './create-trainer_class.dto';

export class UpdateTrainerClassDto extends PartialType(CreateTrainerClassDto) {}
