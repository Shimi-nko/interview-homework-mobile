import { ThemedText } from '@components/ThemedText';
import { Button } from '@components/ui/button';
import { useWarehouse } from '@context/warehouse-context';
import { useImage } from '@hooks/use-image';
import type { WarehouseItem } from '@models/WarehouseItem';
import { deleteProductById } from '@repository/warehouse-repository';
import { formatCurrency } from '@utils/currency-utils';
import { useFocusEffect, useNavigation, useRouter } from 'expo-router';
import { type FC, useCallback } from 'react';
import { SafeAreaView, View } from 'react-native';

type DetailScreenProps = {
  productId: string;
};

export const DetailScreen: FC<DetailScreenProps> = ({ productId }) => {
  const { push } = useRouter();
  const { data } = useWarehouse();
  const { setOptions } = useNavigation();

  const { quantity, name, price, description, imageUrl } = data?.find(
    ({ id }) => id === productId,
  ) as WarehouseItem;

  const image = useImage(200, 200, imageUrl);

  useFocusEffect(
    useCallback(() => {
      setOptions({
        headerShown: true,
        headerBackTitle: 'Back',
        title: name,
      });
    }, [name, setOptions]),
  );

  const onDeletePress = async () => {
    await deleteProductById(productId);
    push('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.base}>
        {image}
        <View style={styles.productInfo}>
          <View style={styles.productDescription}>
            <ThemedText type="title">{name}</ThemedText>
            <ThemedText type="description">{description}</ThemedText>
          </View>
          <ThemedText type="defaultSemiBold">
            Price: {formatCurrency(price)}
          </ThemedText>
          <ThemedText type="defaultSemiBold">Quantity: {quantity}</ThemedText>
        </View>
        <View style={styles.buttons}>
          <Button
            title="Delete product"
            onPress={onDeletePress}
            style={styles.deleteButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  base: { padding: 16, alignItems: 'center' },
  productInfo: {
    gap: 8,
    alignItems: 'center',
  },
  productDescription: {
    alignItems: 'center',
  },
  buttons: {
    paddingTop: 24,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 24,
    borderRadius: 12,
  },
};
