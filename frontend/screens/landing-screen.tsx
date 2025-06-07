import { ProductListing } from '@components/ProductListing';
import { useWarehouse } from '@context/warehouse-context';
import type { WarehouseItem } from '@models/WarehouseItem';
import { type FC, useCallback } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';

const ProductDivider: FC = () => <View style={{ height: 8 }} />;

export const LandingScreen: FC = () => {
  const { data } = useWarehouse();

  const renderItem = useCallback(
    ({ item }: { item: WarehouseItem }) => <ProductListing item={item} />,
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ProductDivider}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  flatListContainer: { paddingHorizontal: 16 },
});
