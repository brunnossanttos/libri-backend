export interface RepositoryInterface<T> {
  create(entityName: string, data: any): Promise<T>;
  update(entityName: string, params: any, data: any): Promise<T>;
  delete(entityName: string, params: any): Promise<T>;
  findOne(entityName: string, params: any): Promise<T>;
  findAll(entityName: string, params?: any): Promise<T[]>;
  findUnique(entityName: string, params: any): Promise<T>;
}
