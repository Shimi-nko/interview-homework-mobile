import { ProductListing } from '@components/ProductListing';
import { ProductSearchBar } from '@components/product-search-bar';
import { useWarehouse } from '@context/warehouse-context';
import { useProductSearch } from '@hooks/use-product-search';
import type { WarehouseItem } from '@models/WarehouseItem';
import { type FC, useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProductDivider: FC = () => <View style={{ height: 8 }} />;

export const LandingScreen: FC = () => {
  const { data } = useWarehouse();
  const { products: foundProducts, search } = useProductSearch();

  const renderItem = useCallback(
    ({ item }: { item: WarehouseItem }) => (
      <ProductListing key={item.id} item={item} />
    ),
    [],
  );

  const listHeaderComponent = useCallback(
    () => <ProductSearchBar search={search} />,
    [search],
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={foundProducts || data}
        stickyHeaderIndices={[0]}
        initialNumToRender={5}
        bounces={false}
        ListHeaderComponent={listHeaderComponent}
        ListHeaderComponentStyle={styles.headerStyle}
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
  headerStyle: {
    paddingBottom: 16,
    backgroundColor: 'white',
  },
});
