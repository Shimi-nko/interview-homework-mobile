import { useForm } from '@hooks/use-form';
import { expect } from '@jest/globals';
import { act, renderHook } from '@testing-library/react-native';

type FormValues = {
  title: string;
  description: string;
  price: number;
};
const defaultFormValues: FormValues = {
  title: 'test-title',
  price: 100,
  description: 'test-desc',
};

describe('useForm', () => {
  it('should set default form values from hook param', () => {
    const { result } = renderHook(() => useForm(defaultFormValues));

    act(() => {
      expect(result.current.formValues).toStrictEqual(defaultFormValues);
    });
  });

  it('should set empty object if param is not passed', () => {
    const { result } = renderHook(() => useForm());

    act(() => {
      expect(result.current.formValues).toStrictEqual({});
    });
  });

  it('should set text value for specific key', () => {
    const { result } = renderHook(() => useForm(defaultFormValues));
    const newTitle = 'changed-test-title';

    act(() => {
      result.current.handleTextChange('title', newTitle);
    });
    act(() => {
      expect(result.current.formValues.title).toStrictEqual(newTitle);
    });
  });

  it('should set number value for specific key', () => {
    const { result } = renderHook(() => useForm(defaultFormValues));
    const newPrice = 100.5;

    act(() => {
      result.current.handleNumberChange('price', newPrice);
    });

    act(() => {
      expect(result.current.formValues.price).toStrictEqual(newPrice);
    });
  });

  it('should return actual form values in onSubmit callback', () => {
    const { result } = renderHook(() => useForm(defaultFormValues));

    act(() => {
      result.current.onSubmit((values) =>
        expect(values).toStrictEqual(defaultFormValues),
      );
    });
  });

  it('should return updated form values in onSubmit callback', () => {
    const { result } = renderHook(() => useForm(defaultFormValues));
    const newTitle = 'changed-test-title';
    const newPrice = 100.5;

    act(() => {
      result.current.handleNumberChange('price', newPrice);
      result.current.handleTextChange('title', newTitle);
    });

    const updateFormValues: FormValues = {
      ...defaultFormValues,
      price: newPrice,
      title: newTitle,
    };

    act(() => {
      result.current.onSubmit((values) =>
        expect(values).toStrictEqual(updateFormValues),
      );
    });
  });
});
