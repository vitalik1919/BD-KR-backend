import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import {categoriesProviders} from "./categories.providers";

@Module({
  controllers: [CategoriesController],
  providers: [...categoriesProviders, CategoriesService],
})
export class CategoriesModule {}
