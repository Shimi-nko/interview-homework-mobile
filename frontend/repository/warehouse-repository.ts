import { apiClient } from '@client/api-client';
import { ALL_PRODUCTS_URL } from '@constants/network';
import type { WarehouseItem } from '@models/WarehouseItem';

export const getAllWarehouseProducts = async () => {
  return apiClient<WarehouseItem[]>(ALL_PRODUCTS_URL);
};
