import { ProductListing } from '@components/ProductListing';
import {} from '@components/ui/IconSymbol';
import { useWarehouse } from '@context/warehouse-context';
import type { WarehouseItem } from '@models/WarehouseItem';
import { useCallback } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';

export default function Index() {
  const { data } = useWarehouse();

  const renderItem = useCallback(
    ({ item }: { item: WarehouseItem }) => <ProductListing item={item} />,
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data || []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
