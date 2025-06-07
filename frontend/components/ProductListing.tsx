import { ThemedText } from '@components/ThemedText';
import { useImage } from '@hooks/use-image';
import type { WarehouseItem } from '@models/WarehouseItem';
import { formatCurrency } from '@utils/currency-utils';
import { useRouter } from 'expo-router';
import type { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export type ProductListingProps = {
  item: WarehouseItem;
};

export const ProductListing: FC<ProductListingProps> = ({
  item: { id, name, description, quantity, price, imageUrl },
}) => {
  const { push } = useRouter();
  const image = useImage(50, 50, imageUrl);

  const onPress = () => {
    push({ pathname: '/[id]', params: { id } });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.container}
      onPress={onPress}
    >
      {image && <View style={styles.productImage}>{image}</View>}
      <View style={styles.productInfo}>
        <ThemedText type="defaultSemiBold">{name}</ThemedText>
        <ThemedText type="description" style={styles.productDescription}>
          {description}
        </ThemedText>
      </View>
      <ThemedText type="defaultSemiBold" style={styles.productQuantity}>
        {quantity}x
      </ThemedText>
      <ThemedText type="defaultSemiBold" style={styles.productPrice}>
        {formatCurrency(price)}
      </ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  productImage: {
    marginRight: 8,
  },
  productInfo: {
    flex: 1,
  },
  productDescription: {
    color: '#555',
  },
  productQuantity: {
    marginHorizontal: 8,
  },
  productPrice: {
    marginHorizontal: 8,
  },
});
