import { prismaClient } from '@client/prisma';

export class WarehouseService {
  static async getProducts() {
    return prismaClient.product.findMany();
  }
}
