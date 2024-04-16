import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/core/repository/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly prismaService: PrismaService<User>) {}

  async create(createUserDto: Partial<CreateUserDto>): Promise<User> {
    console.log('🚀 ~ UsersService ~ create ~ createUserDto:', createUserDto);
    try {
      const user = await this.prismaService.create('user', createUserDto);

      return user;
    } catch (error) {
      this.logger.error('Error creating user', error);
      throw error;
    }
  }

  async findAll(params?: any): Promise<User[]> {
    try {
      return await this.prismaService.findAll('user', params);
    } catch (error) {
      this.logger.error('Error finding users', error);
      throw error;
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      return await this.prismaService.findUnique('user', { id });
    } catch (error) {
      this.logger.error('Error finding user', error);
      throw error;
    }
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    try {
      return await this.prismaService.update('user', { id }, data);
    } catch (error) {
      this.logger.error('Error updating user', error);
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prismaService.delete('user', { id });
    } catch (error) {
      this.logger.error('Error removing user', error);
      throw error;
    }
  }
}
