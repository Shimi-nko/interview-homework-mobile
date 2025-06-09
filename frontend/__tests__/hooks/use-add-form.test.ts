import { useAddForm } from '@hooks/use-add-form';
import { expect } from '@jest/globals';
import { act, renderHook, waitFor } from '@testing-library/react-native';

const newTitle = 'changed-test-title';
const newDescription = 'changed-test-description';
const newPrice = '1,50';
const newQuantity = '30';

const negativePrice = '-1';
const negativeQuantity = '-30';

describe('useAddForm', () => {
  it('should be empty on init', () => {
    const { result } = renderHook(() => useAddForm());

    act(() => {
      result.current.onSubmit((values) => {
        expect(values).toStrictEqual({});
      });
    });
  });

  it('should be disabled on init', () => {
    const { result } = renderHook(() => useAddForm());

    act(() => {
      expect(result.current.disabledSubmit).toBeTruthy();
    });
  });

  it('should set disabledSubmit to false', async () => {
    const { result } = renderHook(() => useAddForm());

    act(() => {
      result.current.data.at(0)?.onChangeText?.(newTitle);
      result.current.data.at(1)?.onChangeText?.(newDescription);
      result.current.data.at(2)?.onChangeText?.(newPrice);
      result.current.data.at(3)?.onChangeText?.(newQuantity);
    });

    await waitFor(() => {
      expect(result.current.disabledSubmit).toBeFalsy();
    });
  });
  it('should set disabledSubmit to true if price changes to negative value', async () => {
    const { result } = renderHook(() => useAddForm());

    act(() => {
      result.current.data.at(2)?.onChangeText?.(negativePrice);
    });

    await waitFor(() => {
      expect(result.current.disabledSubmit).toBeTruthy();
    });
  });

  it('should set disabledSubmit to true if quantity changes to negative value', async () => {
    const { result } = renderHook(() => useAddForm());

    act(() => {
      result.current.data.at(2)?.onChangeText?.(negativeQuantity);
    });

    await waitFor(() => {
      expect(result.current.disabledSubmit).toBeTruthy();
    });
  });
});
