import {Inject, Injectable} from '@nestjs/common';
import { Repository } from 'typeorm';
import {Customer} from "./entities/customer.entity";

@Injectable()
export class CustomersService {

  constructor(
      @Inject('CUSTOMER_REPOSITORY')
      private customerRepository: Repository<Customer>,
  ) {}

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }
}
