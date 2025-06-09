import { useAddForm } from '@hooks/use-add-form';
import { useEditForm } from '@hooks/use-edit-form';
import { expect } from '@jest/globals';
import type { CreateWarehouseItem } from '@models/warehouse-item';
import { act, renderHook, waitFor } from '@testing-library/react-native';

const defaultProduct: CreateWarehouseItem = {
  name: 'test-title',
  description: 'test-desc',
  price: 100,
  quantity: 100,
};

const newPrice = '-1';
const newQuantity = '-30';

describe('useEditForm', () => {
  it('should be empty on init', () => {
    const { result } = renderHook(() => useEditForm(defaultProduct));

    act(() => {
      result.current.onSubmit((values) => {
        expect(values).toStrictEqual({});
      });
    });
  });

  it('should be enabled on init', () => {
    const { result } = renderHook(() => useEditForm(defaultProduct));

    act(() => {
      expect(result.current.disabledSubmit).toBeFalsy();
    });
  });

  it('should set disabledSubmit to true if price changes to negative value', async () => {
    const { result } = renderHook(() => useAddForm());

    act(() => {
      result.current.data.at(2)?.onChangeText?.(newPrice);
    });

    await waitFor(() => {
      expect(result.current.disabledSubmit).toBeTruthy();
    });
  });

  it('should set disabledSubmit to true if quantity changes to negative value', async () => {
    const { result } = renderHook(() => useAddForm());

    act(() => {
      result.current.data.at(2)?.onChangeText?.(newQuantity);
    });

    await waitFor(() => {
      expect(result.current.disabledSubmit).toBeTruthy();
    });
  });
});
