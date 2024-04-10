import {Inject, Injectable} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {

  constructor(
      @Inject('REVIEW_REPOSITORY')
      private reviewRepository: Repository<Review>,
  ) {}

  async findAll(): Promise<Review[]> {
    return this.reviewRepository.find();
  }

  async findOne(id: number): Promise<Review | undefined> {
    return this.reviewRepository.findOne({ where: { id: id } });
  }

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    return this.reviewRepository.save(createReviewDto);
  }

  async update(id: number, updateReviewDto: UpdateReviewDto): Promise<Review | undefined> {
    await this.reviewRepository.update(id, updateReviewDto);
    return this.reviewRepository.findOne({ where: { id: id } });
  }

  async remove(id: number): Promise<void> {
    await this.reviewRepository.delete(id);
  }
}
