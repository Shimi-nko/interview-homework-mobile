import { apiClient } from '@client/api-client';
import { ALL_PRODUCTS_URL, PRODUCT_BY_ID_URL } from '@constants/network';
import type { WarehouseItem } from '@models/WarehouseItem';

export const getAllWarehouseProducts = async () =>
  apiClient<WarehouseItem[]>(ALL_PRODUCTS_URL);

export const deleteProductById = async (id: string) => {
  const url = PRODUCT_BY_ID_URL(id);
  return apiClient<string>(url, { method: 'DELETE' }, 'text');
};
