import type { CreateWarehouseItem, WarehouseItem } from '@models/WarehouseItem';

export const mapProductToEditFormValues = (
  product: WarehouseItem | undefined,
): CreateWarehouseItem | undefined => {
  if (!product) {
    return undefined;
  }
  const { id, createdAt, updatedAt, ...rest } = product;

  return rest;
};
