import { describe, expect } from '@jest/globals';
import type { WarehouseItem } from '@models/warehouse-item';
import {
  getProductsByNumericValues,
  getProductsByTextValues,
} from '@utils/search-utils';

const MOCK_DATA: WarehouseItem[] = [
  {
    id: 'id-1',
    name: 'test-1',
    description: 'desc-1',
    price: 1.5,
    quantity: 10,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 'id-2',
    name: 'test-2',
    description: 'desc-2',
    price: 20,
    quantity: 1,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 'id-3',
    name: 'test-3',
    description: 'desc-3',
    price: 10,
    quantity: 1000,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 'id-4',
    name: 'test-4',
    description: 'desc-4',
    price: 1000,
    quantity: 1000,
    createdAt: '',
    updatedAt: '',
  },
];

describe('getProductsByNumericValues', () => {
  it('should return empty array if no products are found', () => {
    const foundProducts = getProductsByNumericValues(MOCK_DATA, '800');
    expect(foundProducts).toHaveLength(0);
  });

  it('should return products with exact price', () => {
    const foundProducts = getProductsByNumericValues(MOCK_DATA, '1.5');
    expect(foundProducts).toHaveLength(1);
  });

  it('should return products with same quantity', () => {
    const foundProducts = getProductsByNumericValues(MOCK_DATA, '1000');
    expect(foundProducts).toHaveLength(2);
  });

  it('should return products with similar price', () => {
    const foundProducts = getProductsByNumericValues(MOCK_DATA, '10');
    expect(foundProducts).toHaveLength(3);
  });
});

describe('getProductsByTextValues', () => {
  it('should return empty array if no products are found', () => {
    const foundProducts = getProductsByTextValues(MOCK_DATA, 'unique text');
    expect(foundProducts).toHaveLength(0);
  });

  it('should return products with similar names', () => {
    const foundProducts = getProductsByTextValues(MOCK_DATA, 'test');
    expect(foundProducts).toHaveLength(4);
  });

  it('should return products with exact name', () => {
    const foundProducts = getProductsByTextValues(MOCK_DATA, 'test-1');
    expect(foundProducts).toHaveLength(1);
  });

  it('should return products with similar descriptions', () => {
    const foundProducts = getProductsByTextValues(MOCK_DATA, 'de');
    expect(foundProducts).toHaveLength(4);
  });

  it('should return products with exact description', () => {
    const foundProducts = getProductsByTextValues(MOCK_DATA, 'desc-4');
    expect(foundProducts).toHaveLength(1);
  });
});
