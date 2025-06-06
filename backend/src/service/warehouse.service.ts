import { prismaClient } from '@client/prisma';
import type { CreateProductBodyRequest } from '@models/product';

export class WarehouseService {
  static async createProduct(productData: CreateProductBodyRequest) {
    return prismaClient.product.create({ data: productData });
  }
  static async getProducts() {
    return prismaClient.product.findMany();
  }
}
