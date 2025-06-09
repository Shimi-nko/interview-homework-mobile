import { describe, expect, it } from '@jest/globals';
import type { WarehouseItem } from '@models/warehouse-item';
import { mapProductToEditFormValues } from '@utils/product-utils';

const MOCK_PRODUCT: WarehouseItem = {
  id: 'something unique',
  name: 'something unique',
  description: 'something unique',
  price: 15,
  quantity: 1,
  createdAt: '2025-06-06T12:43:30.040Z',
  updatedAt: '2025-06-06T12:43:30.040Z',
};

describe('mapProductToEditFormValues', () => {
  it('should return undefined if param is undefined', () => {
    const formValues = mapProductToEditFormValues(undefined);
    expect(formValues).toEqual(undefined);
  });
  it('should return CreateWarehouseItem, without id, createdAt, updatedAt', () => {
    const formValues = mapProductToEditFormValues(MOCK_PRODUCT);
    expect(formValues).toStrictEqual(formValues);
  });
});
