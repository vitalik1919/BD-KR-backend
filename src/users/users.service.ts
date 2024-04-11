import {Inject, Injectable} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {Trainer} from "../trainers/entities/trainer.entity";
import {Customer} from "../customers/entities/customer.entity";
import {Admin} from "../admins/entities/admin.entity";
import {SignUpDto} from "./dto/sign-up.dto";
import {CreateCustomerDto} from "../customers/dto/create-customer.dto";
import {CustomersService} from "../customers/customers.service";


@Injectable()
export class UsersService {

  constructor(
      @Inject('USER_REPOSITORY')
      private userRepository: Repository<User>,
      private customerService : CustomersService
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  async findOne(username: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { username: username } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.findOne(createUserDto.username)
    if (existingUser)
      throw new Error('User already exists')
    else
      return this.userRepository.save(createUserDto)
  }

  async signUpCustomer(signUpDTO : SignUpDto) {

    const user = new CreateUserDto(signUpDTO.username, signUpDTO.password, signUpDTO.role)
    const promiseUser = await this.create(user)
    if (promiseUser) {
      console.log("test1")
      const foundUser = await this.findOne(signUpDTO.username)
      if (foundUser) {
        console.log("test2")
        const userId = foundUser.id;
        const customer = new CreateCustomerDto(userId, signUpDTO.first_name, signUpDTO.last_name,
                                                                 signUpDTO.gender, signUpDTO.date_of_birth)
        const promiseCustomer = await this.customerService.create(customer)
        if(promiseCustomer) {
          console.log("test3")
          return promiseCustomer
        }
        else {
          throw new Error('Customer creation error')
        }
      }
      else {
        throw new Error('User addition error')
      }
    }
    else {
      throw new Error('User creation error')
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | undefined> {
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOne({ where: { id: id } });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

}
