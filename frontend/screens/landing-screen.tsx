import { ProductListing } from '@components/product-listing';
import { ProductSearchBar } from '@components/product-search-bar';
import { AddButton } from '@components/ui/add-button';
import { EmptyWarehouse } from '@components/warehouse/empty-warehouse';
import { LoadingWarehouseProducts } from '@components/warehouse/loading-warehouse-products';
import { WarehouseError } from '@components/warehouse/warehouse-error';
import { useWarehouse } from '@context/warehouse-context';
import { useProductSearch } from '@hooks/use-product-search';
import type { WarehouseItem } from '@models/warehouse-item';
import { type FC, useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProductDivider: FC = () => <View style={{ height: 8 }} />;

export const LandingScreen: FC = () => {
  const { data, error, loading, refetch, refetching } = useWarehouse();
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
      return <WarehouseError />;
    }
    if (loading) {
      return <LoadingWarehouseProducts itemsCount={5} />;
    }
    if (!data || data.length === 0) {
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
        refreshing={refetching}
        onRefresh={refetch}
        ListEmptyComponent={listEmptyComponent}
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
