import { useCallback, useState } from 'react';

export const useForm = <T>(defaultValues?: T) => {
  const [formValues, setFormValues] = useState<T>(defaultValues || ({} as T));

  const handleChange = (name: keyof T, value: T[keyof T]) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };
  const onSubmit = useCallback(
    (callback: (values: T) => void) => () => callback(formValues),
    [formValues],
  );

  return { formValues, handleChange, onSubmit };
};
