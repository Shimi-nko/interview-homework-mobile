import { apiClient } from '@client/api-client';
import {
  ALL_PRODUCTS_URL,
  BASE_URL,
  PRODUCT_BY_ID_URL,
} from '@constants/network';
import type {
  CreateWarehouseItem,
  WarehouseItem,
} from '@models/warehouse-item';

export const getAllWarehouseProducts = async () =>
  apiClient<WarehouseItem[]>(ALL_PRODUCTS_URL);

export const deleteProductById = async (id: string) => {
  const url = PRODUCT_BY_ID_URL(id);
  return apiClient<string>(url, { method: 'DELETE' }, 'text');
};

export const createProduct = async (product: CreateWarehouseItem) =>
  apiClient<WarehouseItem>(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(product),
  });

export const updateProduct = async (
  id: string,
  product: CreateWarehouseItem,
) => {
  const url = PRODUCT_BY_ID_URL(id);
  return apiClient<WarehouseItem>(url, {
    method: 'PATCH',
    body: JSON.stringify(product),
  });
};
