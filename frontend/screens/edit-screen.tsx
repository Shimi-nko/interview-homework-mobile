import { ThemedText } from '@components/themed-text';
import { Button } from '@components/ui/button/button';
import { FormInput, type FormInputProps } from '@components/ui/form-input';
import { useWarehouse } from '@context/warehouse-context';
import { useEditForm } from '@hooks/use-edit-form';
import type { CreateWarehouseItem } from '@models/warehouse-item';
import { updateProduct } from '@repository/warehouse-repository';
import { mapProductToEditFormValues } from '@utils/product-utils';
import { useNavigation, useRouter } from 'expo-router';
import { type FC, useCallback, useEffect, useMemo } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

type EditScreenProps = {
  productId: string;
};

export const EditScreen: FC<EditScreenProps> = ({ productId }) => {
  const { back } = useRouter();
  const { setOptions } = useNavigation();
  const { findProductById, refetch } = useWarehouse();
  const product = findProductById(productId);

  const editFormProduct = useMemo(
    () => mapProductToEditFormValues(product),
    [product],
  );

  const { data, disabledSubmit, onSubmit } = useEditForm(editFormProduct);

  useEffect(() => {
    setOptions({
      headerShown: true,
      headerBackTitle: 'Back',
      title: `Edit ${product?.name}`,
    });
  }, [setOptions, product?.name]);

  if (!product) {
    return null;
  }

  const renderItem = useCallback(
    ({ item }: { item: FormInputProps }) => <FormInput {...item} />,
    [],
  );

  const listHeaderComponent = useCallback(
    () => (
      <ThemedText type="title" style={styles.title}>
        Edit product
      </ThemedText>
    ),
    [],
  );

  const onFormSubmit = useCallback(
    async (values: CreateWarehouseItem) => {
      await updateProduct(productId, values);
      await refetch();
      back();
    },
    [productId, refetch, back],
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding', android: 'height' })}
      style={styles.keyboardAvoidingView}
    >
      <SafeAreaView style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.label}
          renderItem={renderItem}
          ListHeaderComponent={listHeaderComponent}
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={styles.flatListContainer}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Update product"
            variant="secondary"
            rightIcon="save"
            disabled={disabledSubmit}
            onPress={onSubmit(onFormSubmit)}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: { flex: 1, backgroundColor: 'white' },
  flatListContainer: { padding: 24, gap: 16 },
  title: {
    textAlign: 'center',
    paddingBottom: 16,
  },
  buttonContainer: { padding: 24 },
});
