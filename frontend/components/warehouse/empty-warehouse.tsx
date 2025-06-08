import { ThemedText } from '@components/themed-text';
import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';

export const EmptyWarehouse: FC = () => {
  return (
    <View style={styles.container}>
      <ThemedText type="subtitle">Oh no, the warehouse is empty 😔</ThemedText>
      <ThemedText type="defaultSemiBold">
        Click on the bottom right button (plus sign) to create new product.
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 16,
  },
});
