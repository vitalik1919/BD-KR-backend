import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DatasetService } from './dataset.service';

@Controller('dataset')
export class DatasetController {
  constructor(private readonly datasetService: DatasetService) {}

  @Get()
  generateData() {
    return this.datasetService.generateData()
  }
}
