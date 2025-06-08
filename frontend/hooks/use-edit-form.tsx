import type { FormInputProps } from '@components/ui/form-input';
import { useForm } from '@hooks/use-form';
import type { CreateWarehouseItem } from '@models/warehouse-item';
import { useMemo } from 'react';

export const useEditForm = (product?: CreateWarehouseItem) => {
  const { formValues, onSubmit, handleNumberChange, handleTextChange } =
    useForm<CreateWarehouseItem>(product);

  const disabledSubmit = useMemo(() => {
    const requiredFields =
      !formValues.name ||
      !formValues.description ||
      !formValues.price ||
      !formValues.quantity;

    const minimalQuantity = formValues.quantity < 1;
    const minimalPrice = formValues.price < 0;

    return requiredFields || minimalQuantity || minimalPrice;
  }, [formValues]);

  const data: FormInputProps[] = useMemo(
    () => [
      {
        label: 'Product name',
        placeholder: 'Super Product',
        defaultValue: product?.name,
        onChangeText: (value) => handleTextChange('name', value),
      },
      {
        label: 'Product description',
        multiline: true,
        defaultValue: product?.description,
        placeholder: 'This is a great product that does many things.',
        onChangeText: (value) => handleTextChange('description', value),
      },
      {
        label: 'Unit price(in €)',
        placeholder: '1,5',
        defaultValue: String(product?.price),
        keyboardType: 'decimal-pad',
        onChangeText: (value) => handleNumberChange('price', value),
      },
      {
        label: 'Initial quantity',
        placeholder: '10',
        defaultValue: String(product?.quantity),
        keyboardType: 'number-pad',
        onChangeText: (value) => handleNumberChange('quantity', value),
      },
      {
        label: 'Image url (optional)',
        defaultValue: product?.imageUrl,
        onChangeText: (value) => handleTextChange('imageUrl', value),
      },
    ],
    [handleTextChange, handleNumberChange, product],
  );
  return { data, disabledSubmit, onSubmit };
};
