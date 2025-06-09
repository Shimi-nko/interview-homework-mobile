import { useWarehouse } from '@context/warehouse-context';
import type { WarehouseItem } from '@models/warehouse-item';
import {
  getProductsByNumericValues,
  getProductsByTextValues,
} from '@utils/search-utils';
import { replaceCommaForPeriodSymbol } from '@utils/string-utils';
import { useCallback, useEffect, useState } from 'react';

export const useProductSearch = () => {
  const { data } = useWarehouse();
  const [products, setProducts] = useState<WarehouseItem[]>();

  // biome-ignore lint/correctness/useExhaustiveDependencies: reset products when data changes
  useEffect(() => {
    setProducts(undefined);
  }, [data]);

  const search = useCallback(
    (searchText: string) => {
      if (!data) {
        return setProducts([]);
      }

      const isNumericSearch = !Number.isNaN(Number.parseFloat(searchText));

      if (isNumericSearch) {
        const decimalString = replaceCommaForPeriodSymbol(searchText);
        const foundNumericProducts = getProductsByNumericValues(
          data,
          decimalString,
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
