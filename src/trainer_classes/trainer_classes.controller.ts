import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrainerClassesService } from './trainer_classes.service';
import { CreateTrainerClassDto } from './dto/create-trainer_class.dto';
import { UpdateTrainerClassDto } from './dto/update-trainer_class.dto';
import {TrainerClassFilterDTO} from "./dto/TrainerClassFilterDTO";

@Controller('trainer-classes')
export class TrainerClassesController {
  constructor(private readonly trainerClassesService: TrainerClassesService) {}

  @Post()
  create(@Body() createTrainerClassDto: CreateTrainerClassDto) {
    return this.trainerClassesService.create(createTrainerClassDto);
  }

  @Get()
  findAll() {
    return this.trainerClassesService.findAll();
  }

  @Get('available')
  findAvailable() {
    return this.trainerClassesService.findAvailable();
  }

  @Get('customer/:id')
  async findAllOfCustomer(@Param('id') customerId: string) {
    return this.trainerClassesService.findAllOfCustomer(+customerId)
  }

  @Get('trainer/available/:id')
  findAvailableOfTrainer(@Param('id') trainerId: string) {
    return this.trainerClassesService.findAvailableOfTrainer(+trainerId)
  }

  @Get('trainer/:id')
  async findAllOfTrainer(@Param('id') trainerId: string) {
    return this.trainerClassesService.findAllOfTrainer(+trainerId)
  }

  @Post('filtered')
  async filterClasses(@Body() filterDTO : TrainerClassFilterDTO) {
    return this.trainerClassesService.filterClasses(filterDTO)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrainerClassDto: UpdateTrainerClassDto) {
    return this.trainerClassesService.update(+id, updateTrainerClassDto);
  }
  @Patch('customer/:id')
  addClassToCustomer(@Param('id') id: string, @Body() updateTrainerClassDto: UpdateTrainerClassDto) {
    return this.trainerClassesService.addClassToCustomer(+id, updateTrainerClassDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trainerClassesService.remove(+id);
  }

}
