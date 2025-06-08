import { prismaClient } from '@client/prisma';
import type {
  CreateProductBodyRequest,
  UpdateProductBodyRequest,
} from '@models/product';

export class WarehouseService {
  static async createProduct(productData: CreateProductBodyRequest) {
    return prismaClient.product.create({ data: productData });
  }
  static async getProducts() {
    return prismaClient.product.findMany();
  }

  static async deleteProductById(id: string) {
    return prismaClient.product.delete({ where: { id } });
  }

  static async updateProductById(id: string, body: UpdateProductBodyRequest) {
    return prismaClient.product.update({ where: { id }, data: body });
  }
}
