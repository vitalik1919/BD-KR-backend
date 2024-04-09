import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import {reviewsProviders} from "./reviews.providers";

@Module({
  controllers: [ReviewsController],
  providers: [...reviewsProviders, ReviewsService],
})
export class ReviewsModule {}
