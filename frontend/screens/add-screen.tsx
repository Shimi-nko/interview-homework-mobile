import { ThemedText } from '@components/themed-text';
import { Button } from '@components/ui/button/button';
import { FormInput, type FormInputProps } from '@components/ui/form-input';
import { useWarehouse } from '@context/warehouse-context';
import { useAddForm } from '@hooks/use-add-form';
import type { CreateWarehouseItem } from '@models/warehouse-item';
import { createProduct } from '@repository/warehouse-repository';
import { useNavigation, useRouter } from 'expo-router';
import { type FC, useCallback, useEffect } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

export const AddScreen: FC = () => {
  const { back } = useRouter();
  const { refetch } = useWarehouse();
  const { setOptions } = useNavigation();
  const { data, disabledSubmit, onSubmit } = useAddForm();

  useEffect(() => {
    setOptions({
      headerShown: true,
      headerBackTitle: 'Back',
      title: 'Add Product',
    });
  }, [setOptions]);

  const renderItem = useCallback(
    ({ item }: { item: FormInputProps }) => <FormInput {...item} />,
    [],
  );

  const listHeaderComponent = useCallback(
    () => (
      <ThemedText type="title" style={styles.title}>
        Add new product
      </ThemedText>
    ),
    [],
  );

  const onFormSubmit = useCallback(
    async (values: CreateWarehouseItem) => {
      await createProduct(values);
      await refetch();
      back();
    },
    [back, refetch],
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
            title="Create product"
            variant="success"
            rightIcon="addfile"
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
