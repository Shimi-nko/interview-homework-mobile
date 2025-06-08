import type { ApiFetcherData } from '@customTypes/api-fetcher';
import { useApiFetcher } from '@hooks/use-api-fetcher';
import type { WarehouseItem } from '@models/WarehouseItem';
import { getAllWarehouseProducts } from '@repository/warehouse-repository';
import {
  type FC,
  type PropsWithChildren,
  createContext,
  useCallback,
  useContext,
} from 'react';

type WarehouseContextProps = ApiFetcherData<WarehouseItem[]> & {
  findProductById: (id: string) => WarehouseItem | undefined;
};

const WarehouseContext = createContext<WarehouseContextProps>({
  loading: false,
  refetching: false,
  refetch: () => Promise.resolve(),
  findProductById: (id) => undefined,
});

export const WarehouseContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const values = useApiFetcher(getAllWarehouseProducts);

  const findProductById = useCallback(
    (id: string) => values.data?.find((item) => item.id === id),
    [values.data],
  );
  return (
    <WarehouseContext.Provider value={{ ...values, findProductById }}>
      {children}
    </WarehouseContext.Provider>
  );
};

export const useWarehouse = () => useContext(WarehouseContext);
