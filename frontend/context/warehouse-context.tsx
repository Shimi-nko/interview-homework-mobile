import type { ApiFetcherData } from '@customTypes/api-fetcher';
import { useApiFetcher } from '@hooks/use-api-fetcher';
import type { WarehouseItem } from '@models/WarehouseItem';
import { getAllWarehouseProducts } from '@repository/warehouse-repository';
import {
  type FC,
  type PropsWithChildren,
  createContext,
  useContext,
} from 'react';

type WarehouseContextProps = ApiFetcherData<WarehouseItem[]> & {};

const WarehouseContext = createContext<WarehouseContextProps>({
  loading: false,
});

export const WarehouseContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const values = useApiFetcher(getAllWarehouseProducts);
  return (
    <WarehouseContext.Provider value={values}>
      {children}
    </WarehouseContext.Provider>
  );
};

export const useWarehouse = () => useContext(WarehouseContext);
