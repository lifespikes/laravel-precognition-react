import { useMemo, useState } from 'react';
import { toSimpleValidationErrors } from 'laravel-precognition';
import {
  FieldPath,
  FieldValues,
  UsePrecognitionFormProps,
  UsePrecognitionFormReturn,
} from '../types';
import { usePrecognition } from './usePrecognition';

export function usePrecognitionForm<TForm extends FieldValues = FieldValues>({
  precognition: { method, url, config },
  form: { initialValues },
}: UsePrecognitionFormProps<TForm>): UsePrecognitionFormReturn<TForm> {
  const [data, setData] = useState<TForm>(initialValues);
  const [errors, setErrors] = useState<Record<FieldPath<TForm>, string> | null>(
    null
  );
  const clearErrors = () => setErrors(null);
  const { validator, setLastTouched, touched, ...rest } =
    usePrecognition<TForm>(method, url, data, config);

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
        (field: FieldPath<TForm>) =>
          errors && typeof errors[field] === 'undefined'
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
    validateAndSetDataByKeyValuePair(name, value) {
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
