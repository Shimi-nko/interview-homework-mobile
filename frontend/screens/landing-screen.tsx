import { ProductListing } from '@components/ProductListing';
import { ProductSearchBar } from '@components/product-search-bar';
import { AddButton } from '@components/ui/add-button';
import { EmptyWarehouse } from '@components/warehouse/empty-warehouse';
import { LoadingWarehouseProducts } from '@components/warehouse/loading-warehouse-products';
import { useWarehouse } from '@context/warehouse-context';
import { useProductSearch } from '@hooks/use-product-search';
import type { WarehouseItem } from '@models/WarehouseItem';
import { type FC, Fragment, useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProductDivider: FC = () => <View style={{ height: 8 }} />;

export const LandingScreen: FC = () => {
  const { data, error, loading } = useWarehouse();
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

  const listEmptyComponent = useCallback(() => {
    if (error) {
      return <Fragment />;
    }
    if (loading) {
      return <LoadingWarehouseProducts itemsCount={5} />;
    }
    if (!data) {
      return <EmptyWarehouse />;
    }
    return null;
  }, [data, error, loading]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={foundProducts || data}
        stickyHeaderIndices={[0]}
        initialNumToRender={5}
        ListEmptyComponent={listEmptyComponent}
        bounces={false}
        ListHeaderComponent={listHeaderComponent}
        ListHeaderComponentStyle={styles.headerStyle}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ProductDivider}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContainer}
      />
      <AddButton />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  flatListContainer: { paddingHorizontal: 16, paddingBottom: 32 },
  headerStyle: {
    paddingBottom: 16,
    backgroundColor: 'white',
  },
});
