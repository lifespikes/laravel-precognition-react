import { useMemo, useState } from 'react';
import { toSimpleValidationErrors } from 'laravel-precognition';
import { UsePrecognitionFormReturn, UsePrecognitionFormProps } from '../types';
import { usePrecognition } from './usePrecognition';

export function usePrecognitionForm<TForm = Record<string, any>>({
  precognition: { method, url, config },
  form: { initialValues },
}: UsePrecognitionFormProps<TForm>): UsePrecognitionFormReturn<TForm> {
  const [data, setData] = useState<TForm>(initialValues);
  const [errors, setErrors] = useState<Record<keyof TForm, string> | null>(
    null
  );
  const clearErrors = () => setErrors(null);
  const { validator, setLastTouched, touched, ...rest } = usePrecognition(
    method,
    url,
    data,
    config
  );

  validator.on('validatingChanged', () => {
    clearErrors();
    setErrors(
      toSimpleValidationErrors(validator.errors()) as unknown as Record<
        keyof TForm,
        string
      >
    );
  });

  const passed = useMemo(
    () =>
      touched.filter(
        (field: keyof TForm) => errors && typeof errors[field] === 'undefined'
      ),
    [errors, touched]
  );

  return {
    ...rest,
    validator,
    setLastTouched,
    touched,
    data,
    setData,
    errors,
    setErrors,
    clearErrors,
    validateAndSetDataByKeyValuePair(name: keyof TForm, value: any) {
      setData({
        ...data,
        [name]: value,
      });

      setLastTouched(name);

      return this;
    },
    passed,
  };
}
