import { prismaClient } from '@client/prisma';
import type { CreateProductBodyRequest } from '@models/product';
import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import app from './index';
import type { Product } from './prisma';

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

beforeEach(async () => {
  await prismaClient.product.createMany({
    data: MOCK_DATA,
  });
});

afterAll(async () => {
  await prismaClient.product.deleteMany();
});

describe('all endpoint - get', () => {
  it('should return some products', async () => {
    const res = await app.request('/all');

    // Assertions
    expect(res.status).toBe(200);
    expect(await res.json()).length(2);
  });
  it('should return empty array, if there are no products', async () => {
    await prismaClient.product.deleteMany();
    const res = await app.request('/all');

    // Assertions
    expect(res.status).toBe(200);
    expect(await res.json()).length(0);
  });
});

describe('root endpoint - create', () => {
  it('should create product', async () => {
    const product = MOCK_DATA[0];
    const res = await app.request('', {
      method: 'POST',
      body: JSON.stringify(product),
    });

    // Assertions
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject(product);
  });

  it('should throw error and return 400 status, if there are unsupported values in body', async () => {
    const product = {
      ...MOCK_DATA[0],
      notSupportedValue: 'something something',
    };

    const res = await app.request('', {
      method: 'POST',
      body: JSON.stringify(product),
    });
    expect(res.status).toBe(400);
  });
});

describe('root endpoint - update', () => {
  it('root endpoint - update', async () => {
    const createProductRes = await app.request('', {
      method: 'POST',
      body: JSON.stringify(MOCK_DATA[0]),
    });

    const { id }: Product = await createProductRes.json();

    const updateProduct = { ...MOCK_DATA[0], price: 1000 };

    const res = await app.request(`${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updateProduct),
    });

    expect(res.status).toBe(200);
    const responseJSON = await res.json();

    expect(responseJSON.price).toEqual(updateProduct.price);
  });

  it('should throw error and return 400 status, if there are unsupported values in body', async () => {
    const createProductRes = await app.request('', {
      method: 'POST',
      body: JSON.stringify(MOCK_DATA[0]),
    });

    const { id, createdAt, updatedAt, ...rest }: Product =
      await createProductRes.json();

    const updateProduct = { ...rest, notSupportedValue: 'something something' };

    const res = await app.request(`${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updateProduct),
    });

    expect(res.status).toBe(400);
  });
});

describe('root endpoint - delete', () => {
  it('root endpoint - delete', async () => {
    const createRes = await app.request('', {
      method: 'POST',
      body: JSON.stringify(MOCK_DATA[0]),
    });

    const { id }: Product = await createRes.json();

    const res = await app.request(`/${id}`, {
      method: 'DELETE',
    });

    // Assertions
    expect(res.status).toBe(200);
    expect(await res.text()).toBe(id);
  });

  it('should throw error and return 400 status, if there are unsupported values in body', async () => {
    const res = await app.request('/unique-id-123', {
      method: 'DELETE',
    });

    expect(res.status).toBe(400);
  });
});
