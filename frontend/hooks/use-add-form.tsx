import type { FormInputProps } from '@components/ui/form-input';
import { useForm } from '@hooks/use-form';
import type { CreateWarehouseItem } from '@models/warehouse-item';
import { useMemo } from 'react';

export const useAddForm = () => {
  const { formValues, onSubmit, handleTextChange, handleNumberChange } =
    useForm<CreateWarehouseItem>();

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
        onChangeText: (value) => handleTextChange('name', value),
      },
      {
        label: 'Product description',
        multiline: true,
        placeholder: 'This is a great product that does many things.',
        onChangeText: (value) => handleTextChange('description', value),
      },
      {
        label: 'Unit price(in €)',
        placeholder: '1,5',
        keyboardType: 'decimal-pad',
        onChangeText: (value) => handleNumberChange('price', value),
      },
      {
        label: 'Initial quantity',
        placeholder: '10',
        keyboardType: 'number-pad',
        onChangeText: (value) => handleNumberChange('quantity', value),
      },
      {
        label: 'Image url (optional)',
        onChangeText: (value) => handleTextChange('imageUrl', value),
      },
    ],
    [handleTextChange, handleNumberChange],
  );
  return { data, disabledSubmit, onSubmit };
};
