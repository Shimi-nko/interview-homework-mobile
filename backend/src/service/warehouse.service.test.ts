import { prismaClient } from '@client/prisma';
import type { CreateProductBodyRequest } from '@models/product';
import { WarehouseService } from '@service/warehouse.service';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const MOCK_DATA: CreateProductBodyRequest[] = [
  {
    name: 'test-1',
    description: 'test-description-1',
    quantity: 10,
    price: 10,
    imageUrl: null,
  },
  {
    name: 'test-2',
    description: 'test-description-2',
    quantity: 10,
    price: 10,
    imageUrl: null,
  },
];

beforeAll(async () => {
  // create products
  await prismaClient.product.createMany({
    data: MOCK_DATA,
  });
});

afterAll(async () => {
  await prismaClient.product.deleteMany();

  await prismaClient.$transaction([]);

  await prismaClient.$disconnect();
});

describe('Warehouse.service - createProduct', () => {
  it('should create 1 new product', async () => {
    const product: CreateProductBodyRequest = {
      name: 'New super product',
      description: 'It does stuff',
      price: 1.5,
      quantity: 10,
      imageUrl: null,
    };

    const newProduct = await WarehouseService.createProduct(product);

    const foundProduct = await prismaClient.product.findUnique({
      where: { id: newProduct.id },
    });

    if (!foundProduct) {
      throw new Error('this should not happen');
    }
    expect(foundProduct.name).toEqual(newProduct.name);
  });

  it('should throw error when there are non supported values in body when creating product', async () => {
    const product = {
      name: 'New super product',
      description: 'It does stuff',
      price: 1.5,
      quantity: 10,
      imageUrl: null,
      notSupportedValue: 'something something',
    };
    // Throw prisma error
    await expect(
      WarehouseService.createProduct(product),
    ).rejects.toThrowError();
  });
});

describe('Warehouse.service - getProducts', () => {
  it('should retrieve all products', async () => {
    const products = await WarehouseService.getProducts();
    expect(products).length(3);
  });
  it('should retrieve empty array if there are no products', async () => {
    await prismaClient.product.deleteMany();
    const products = await WarehouseService.getProducts();
    expect(products).length(0);
  });
});

describe('Warehouse.service - updateProductById', () => {
  it('should update product with new data', async () => {
    const { createdAt, updatedAt, id, ...rest } =
      await WarehouseService.createProduct(MOCK_DATA[0]);

    const updatedProduct: CreateProductBodyRequest = {
      ...rest,
      price: 100,
    };

    const updateProduct = await WarehouseService.updateProductById(
      id,
      updatedProduct,
    );

    expect(updateProduct.price).toEqual(updatedProduct.price);
  });

  it('should throw error when there are non supported values in body', async () => {
    const { createdAt, updatedAt, id, ...rest } =
      await WarehouseService.createProduct(MOCK_DATA[0]);

    const updatedProduct = {
      ...rest,
      price: 100,
      notSupportedValue: 'something something',
    };

    await expect(
      WarehouseService.updateProductById(id, updatedProduct),
    ).rejects.toThrowError();
  });
});

describe('Warehouse.service - deleteProductById', () => {
  it('should delete product with specific id', async () => {
    const { id } = await WarehouseService.createProduct(MOCK_DATA[0]);

    const deletedProduct = await WarehouseService.deleteProductById(id);

    expect(deletedProduct.id).toEqual(id);
  });

  it('should throw error when there is no product with id', async () => {
    await expect(
      WarehouseService.deleteProductById('unique id'),
    ).rejects.toThrowError();
  });
});
