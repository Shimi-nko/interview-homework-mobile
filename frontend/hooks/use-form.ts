import { replaceCommaForPeriodSymbol } from '@utils/string-utils';
import { useCallback, useState } from 'react';

export const useForm = <T>(defaultValues?: T) => {
  const [formValues, setFormValues] = useState<T>(defaultValues || ({} as T));

  const handleChange = useCallback(
    (name: keyof T, value: T[keyof T]) =>
      setFormValues((prev) => ({ ...prev, [name]: value })),
    [],
  );

  const handleTextChange = useCallback(
    (target: keyof T, value: T[keyof T]) => {
      handleChange(target, value);
    },
    [handleChange],
  );

  const handleNumberChange = useCallback(
    (target: keyof T, value: T[keyof T]) => {
      const numberValue = replaceCommaForPeriodSymbol(String(value));
      handleChange(target, Number(numberValue) as T[keyof T]);
    },
    [handleChange],
  );

  const onSubmit = useCallback(
    (callback: (values: T) => void) => () => callback(formValues),
    [formValues],
  );

  return { formValues, handleTextChange, handleNumberChange, onSubmit };
};
