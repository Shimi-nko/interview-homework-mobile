import { ThemedText } from '@components/ThemedText';
import type { WarehouseItem } from '@models/WarehouseItem';
import { formatCurrency } from '@utils/currency-utils';
import type { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';

export type ProductListingProps = {
  item: WarehouseItem;
};

export const ProductListing: FC<ProductListingProps> = ({
  item: { name, description, quantity, price, imageUrl },
}) => {
  return (
    <View style={styles.container}>
      {imageUrl && <Image src={imageUrl} style={styles.productImage} />}
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
    </View>
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
    width: 50,
    height: 50,
    marginRight: 10,
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
