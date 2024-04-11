import {Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import {Customer} from "../customers/entities/customer.entity";
import {Admin} from "../admins/entities/admin.entity";
import {Trainer} from "../trainers/entities/trainer.entity";
import { Repository } from 'typeorm';
import {User} from "../users/entities/user.entity";

@Injectable()
export class AuthService {

  constructor(
      @Inject('CUSTOMER_REPOSITORY')
      private customerRepository: Repository<Customer>,
      @Inject('ADMIN_REPOSITORY')
      private adminRepository: Repository<Admin>,
      @Inject('TRAINER_REPOSITORY')
      private trainerRepository: Repository<Trainer>,
      private usersService: UsersService,
      private jwtService: JwtService
  ) {}
  async signIn(username: string, pass: string,): Promise<{ access_token: string }> {

    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { id: user.id, role: user.role };
    
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async getProfile(user : User) {

    if (!user) {
      return undefined;
    }
    let profile : Customer | Admin | Trainer
    switch (user.role) {
      case 0:
        profile = await this.customerRepository.findOne({ where: { id: user.id } });
        break
      case 1:
        profile = await this.adminRepository.findOne({ where: { id: user.id } });
        break
      case 2:
        profile = await this.trainerRepository.findOne({ where: { id: user.id } });
        break
      default:
        break
    }

    return {
      role: user.role,
      data: profile
    }
  }
}