import { ThemedText } from '@components/themed-text';
import { Button } from '@components/ui/button/button';
import { useWarehouse } from '@context/warehouse-context';
import { useImage } from '@hooks/use-image';
import { deleteProductById } from '@repository/warehouse-repository';
import { formatCurrency } from '@utils/currency-utils';
import { useNavigation, useRouter } from 'expo-router';
import { type FC, useCallback, useEffect } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type DetailScreenProps = {
  productId: string;
};

export const DetailScreen: FC<DetailScreenProps> = ({ productId }) => {
  const { back, push } = useRouter();
  const { refetch, findProductById } = useWarehouse();
  const { setOptions } = useNavigation();

  const product = findProductById(productId);

  const image = useImage(200, 200, product?.imageUrl);

  useEffect(() => {
    setOptions({
      headerShown: true,
      headerBackTitle: 'Back',
      title: product?.name,
    });
  }, [setOptions, product?.name]);

  if (!product) {
    return null;
  }

  const deleteProduct = useCallback(async () => {
    await deleteProductById(productId);
    await refetch();
    back();
  }, [productId, refetch, back]);

  const onDeletePress = useCallback(async () => {
    Alert.alert(
      'Are you sure want to delete this product ?',
      'This action is irreversible and will lead to deleting this product from the warehouse ',
      [
        { text: 'Cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: deleteProduct,
        },
      ],
    );
  }, [deleteProduct]);

  const onEditPress = useCallback(
    () => push({ pathname: '/[id]/edit', params: { id: productId } }),
    [productId, push],
  );

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <View style={styles.base}>
        {image && <View style={styles.imageContainer}>{image}</View>}
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
      </View>
      <View style={styles.buttons}>
        <Button title="Edit product" variant="primary" onPress={onEditPress} />
        <Button
          title="Delete product"
          variant="critical"
          onPress={onDeletePress}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  base: { padding: 16, alignItems: 'center' },
  imageContainer: { paddingBottom: 24 },
  productInfo: {
    rowGap: 8,
    alignItems: 'center',
  },
  productDescription: {
    alignItems: 'center',
  },
  buttons: {
    rowGap: 16,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
});
