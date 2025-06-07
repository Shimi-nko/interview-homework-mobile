import { ThemedText } from '@components/ThemedText';
import { IconSymbol } from '@components/ui/IconSymbol';
import { Colors } from '@constants/Colors';
import type { WarehouseItem } from '@models/WarehouseItem';
import type { FC } from 'react';
import {
  Pressable,
  type StyleProp,
  StyleSheet,
  View,
  type ViewStyle,
  useColorScheme,
} from 'react-native';

export type ProductListingProps = {
  item: WarehouseItem;
  style?: StyleProp<ViewStyle>;
};

export const ProductListing: FC<ProductListingProps> = ({
  item: { name, description, quantity, price },
  style,
}) => {
  const theme = useColorScheme() ?? 'light';

  const formatCurrency = (amount: number) => {
    const amountNumber = Number.parseFloat(amount.toString());
    return `€${amountNumber.toFixed(2)}`;
  };

  return (
    <View style={[styles.container, style]}>
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
      <Pressable
        style={styles.addButton}
        onPress={() => {}}
        accessibilityLabel={`Add ${name} to Shipment`}
      >
        <IconSymbol
          name="addfile"
          size={16}
          color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
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
    marginHorizontal: 10,
  },
  productPrice: {
    marginHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#ddd',
    padding: 8,
    borderRadius: 5,
  },
});
