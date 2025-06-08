import type { WarehouseItem } from '@models/warehouse-item';
import { removeAccents } from './string-utils';

export const getProductsByNumericValues = (
  data: WarehouseItem[],
  searchText: string,
) =>
  data.filter(({ price, quantity }) => {
    const stringPrice = String(price.toFixed(2));
    const stringQuantity = String(quantity);

    return (
      stringPrice.includes(String(searchText)) ||
      stringQuantity.includes(String(searchText))
    );
  });

export const getProductsByTextValues = (
  data: WarehouseItem[],
  searchText: string,
) =>
  data.filter(({ name, description }) => {
    const normalizedSearchText = removeAccents(searchText.toLowerCase());

    const normalizedTitle = removeAccents(name.toLowerCase());
    const normalizedDescription = removeAccents(description.toLowerCase());

    return (
      normalizedDescription.includes(normalizedSearchText) ||
      normalizedTitle.includes(normalizedSearchText)
    );
  });
