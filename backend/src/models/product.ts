import type { Product } from 'prisma';

export type CreateProductBodyRequest = Omit<
  Product,
  'id' | 'createdAt' | 'updatedAt'
>;

export type UpdateProductBodyRequest = Partial<CreateProductBodyRequest>;
