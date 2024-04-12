import {Inject, Injectable} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import {CreateCustomerDto} from "./dto/create-customer.dto";
import {UpdateCustomerDto} from "./dto/update-customer.dto";

@Injectable()
export class CustomersService {

  constructor(
      @Inject('CUSTOMER_REPOSITORY')
      private customerRepository: Repository<Customer>,
  ) {}

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  async findOne(id: number): Promise<Customer | undefined> {
    return this.customerRepository.findOne({where: {id : id}});
  }

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.customerRepository.save(createCustomerDto);
  }

  async purchaseGroupClass(id : number, updateCustomerDTO : UpdateCustomerDto) {

    const customer = await this.customerRepository.findOne({where: {id: id}});
    if (!customer) {
      throw new Error(`Customer with id ${updateCustomerDTO.id} not found`);
    }
    customer.groupClass = updateCustomerDTO.groupClass;
    return this.customerRepository.save(customer);
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer | undefined> {
    await this.customerRepository.update(id, updateCustomerDto);
    return this.customerRepository.findOne({where: {id : id}});
  }

  async remove(id: number): Promise<void> {
    await this.customerRepository.delete(id);
  }
}
