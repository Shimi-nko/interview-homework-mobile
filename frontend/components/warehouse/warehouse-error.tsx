import { ThemedText } from '@components/themed-text';
import { IconSymbol } from '@components/ui/IconSymbol';
import { Button } from '@components/ui/button/button';
import { useWarehouse } from '@context/warehouse-context';
import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';

export const WarehouseError: FC = () => {
  const { refetch, loading } = useWarehouse();
  return (
    <View style={styles.container}>
      <View style={styles.errorContainer}>
        <IconSymbol name="exclamationcircleo" color="red" size={100} />
        <ThemedText type="subtitle" style={styles.subtitle}>
          There was error receiving products from warehouse
        </ThemedText>
      </View>
      <Button
        title="Retry"
        onPress={refetch}
        disabled={loading}
        rightIcon="reload1"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 16, gap: 24 },
  subtitle: { textAlign: 'center' },
  errorContainer: {
    gap: 16,
    alignItems: 'center',
  },
});
