import { WarehouseProductPlaceholder } from '@components/warehouse/warehouse-product-placeholder';
import { type FC, useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

const ProductDivider: FC = () => <View style={{ height: 8 }} />;

type LoadingWarehouseProductsProps = {
  itemsCount: number;
};

export const LoadingWarehouseProducts: FC<LoadingWarehouseProductsProps> = ({
  itemsCount,
}) => {
  const items = Array(itemsCount).fill(true);

  const renderItem = useCallback(() => <WarehouseProductPlaceholder />, []);

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      ItemSeparatorComponent={ProductDivider}
      bounces={false}
      scrollEnabled={false}
    />
  );
};
