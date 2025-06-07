import { ThemedText } from '@components/ThemedText';
import { Button } from '@components/ui/button';
import { useWarehouse } from '@context/warehouse-context';
import { useImage } from '@hooks/use-image';
import { deleteProductById } from '@repository/warehouse-repository';
import { formatCurrency } from '@utils/currency-utils';
import { useFocusEffect, useNavigation, useRouter } from 'expo-router';
import { type FC, useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type DetailScreenProps = {
  productId: string;
};

export const DetailScreen: FC<DetailScreenProps> = ({ productId }) => {
  const { back } = useRouter();
  const { data, refetch } = useWarehouse();
  const { setOptions } = useNavigation();

  const product = useMemo(
    () => data?.find(({ id }) => id === productId),
    [data, productId],
  );

  const image = useImage(200, 200, product?.imageUrl);

  useFocusEffect(
    useCallback(() => {
      setOptions({
        headerShown: true,
        headerBackTitle: 'Back',
        title: product?.name,
      });
    }, [product?.name, setOptions]),
  );

  const onDeletePress = async () => {
    await deleteProductById(productId);
    await refetch();
    back();
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <View style={styles.base}>
        {image}
        <View style={styles.productInfo}>
          <View style={styles.productDescription}>
            <ThemedText type="title">{product.name}</ThemedText>
            <ThemedText type="description">{product.description}</ThemedText>
          </View>
          <ThemedText type="defaultSemiBold">
            Price: {formatCurrency(product.price)}
          </ThemedText>
          <ThemedText type="defaultSemiBold">
            Quantity: {product.quantity}
          </ThemedText>
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
