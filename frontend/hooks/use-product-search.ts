import { useWarehouse } from '@context/warehouse-context';
import type { WarehouseItem } from '@models/WarehouseItem';
import {
  getProductsByNumericValues,
  getProductsByTextValues,
} from '@utils/search-utils';
import { useCallback, useState } from 'react';

export const useProductSearch = () => {
  const { data } = useWarehouse();
  const [products, setProducts] = useState<WarehouseItem[]>();

  const search = useCallback(
    (searchText: string) => {
      if (!data) {
        return setProducts([]);
      }

      const isNumericSearch = !Number.isNaN(Number.parseFloat(searchText));

      if (isNumericSearch) {
        const foundNumericProducts = getProductsByNumericValues(
          data,
          searchText,
        );
        return setProducts(foundNumericProducts);
      }

      const foundTextProducts = getProductsByTextValues(data, searchText);
      return setProducts(foundTextProducts);
    },
    [data],
  );

  return { products, search };
};
