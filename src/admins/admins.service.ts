import {Inject, Injectable} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import {CreateAdminDto} from "./dto/create-admin.dto";
import {UpdateAdminDto} from "./dto/update-admin.dto";

@Injectable()
export class AdminsService {

  constructor(
      @Inject('ADMIN_REPOSITORY')
      private adminRepository: Repository<Admin>,
  ) {}

  async findAll(): Promise<Admin[]> {
    return this.adminRepository.find();
  }

  async findOne(id: number): Promise<Admin | undefined> {
    return this.adminRepository.findOne({ where: { id: id } });
  }

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    return this.adminRepository.save(createAdminDto);
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<Admin | undefined> {
    await this.adminRepository.update(id, updateAdminDto);
    return this.adminRepository.findOne({ where: { id: id } });
  }

  async remove(id: number): Promise<void> {
    await this.adminRepository.delete(id);
  }
}
