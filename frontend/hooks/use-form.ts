import { useState } from 'react';

export const useForm = <T>(defaultValues?: T) => {
  const [formValues, setFormValues] = useState<T>(defaultValues || ({} as T));

  const handleChange = (name: keyof T, value: T[keyof T]) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };
  const onSubmit = (callback: (values: T) => void) => {
    callback(formValues);
  };

  return { formValues, handleChange, onSubmit };
};
