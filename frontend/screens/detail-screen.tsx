import { ThemedText } from '@components/ThemedText';
import { Button } from '@components/ui/button';
import { useWarehouse } from '@context/warehouse-context';
import { useImage } from '@hooks/use-image';
import { deleteProductById } from '@repository/warehouse-repository';
import { formatCurrency } from '@utils/currency-utils';
import { useNavigation, useRouter } from 'expo-router';
import { type FC, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
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

  const onDeletePress = async () => {
    await deleteProductById(productId);
    await refetch();
    back();
  };

  const onEditPress = () =>
    push({ pathname: '/[id]/edit', params: { id: productId } });

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
        <Button
          title="Edit product"
          onPress={onEditPress}
          style={[styles.baseButton, styles.editButton]}
        />
        <Button
          title="Delete product"
          onPress={onDeletePress}
          style={[styles.baseButton, styles.deleteButton]}
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
  baseButton: { padding: 24, borderRadius: 12, alignItems: 'center' },
  deleteButton: {
    backgroundColor: 'red',
  },
  editButton: {
    backgroundColor: 'green',
  },
});
