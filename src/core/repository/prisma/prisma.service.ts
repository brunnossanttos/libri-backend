import { Injectable, Logger } from '@nestjs/common';
import { RepositoryInterface } from '../interfaces/repository.interface';
import { prisma } from './db';

@Injectable()
export class PrismaService<T> implements RepositoryInterface<T> {
  private readonly logger = new Logger(PrismaService.name);

  async create(entityName: string, data: any): Promise<T> {
    try {
      console.log('prisma', prisma[entityName]);
      return prisma[entityName].create({ data });
    } catch (error) {
      this.logger.error(error);

      throw error;
    }
  }

  async update(entityName: string, params: any, data: any): Promise<T> {
    try {
      return await prisma[entityName].update({ where: params, data });
    } catch (error) {
      this.logger.error(error);

      throw error;
    }
  }

  async delete(entityName: string, params: any): Promise<T> {
    try {
      return await prisma[entityName].delete({ where: params });
    } catch (error) {
      this.logger.error(error);

      throw error;
    }
  }

  async findOne(entityName: string, params: any): Promise<T> {
    try {
      return await prisma[entityName].findFirst({ where: params });
    } catch (error) {
      this.logger.error(error);

      throw error;
    }
  }

  async findAll(entityName: string, params?: any): Promise<T[]> {
    try {
      return await prisma[entityName].findMany(params);
    } catch (error) {
      this.logger.error(error);

      throw error;
    }
  }

  async findUnique(entityName: string, params: any): Promise<T> {
    try {
      return await prisma[entityName].findUnique({ where: params });
    } catch (error) {
      this.logger.error(error);

      throw error;
    }
  }
}
