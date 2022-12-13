import { useForm } from '@inertiajs/inertia-react';
import { useMemo } from 'react';
import {
  FieldPath,
  FieldValues,
  UseInertiaPrecognitionFormReturn,
  UsePrecognitionFormProps,
} from '../types';
import { usePrecognition } from './usePrecognition';
import { patchInertiaForm } from '../helpers/patchInertiaForm';

export function useInertiaPrecognitionForm<
  TForm extends FieldValues = FieldValues
>({
  precognition: { method, url, config },
  form: { initialValues },
}: UsePrecognitionFormProps<TForm>): UseInertiaPrecognitionFormReturn<TForm> {
  const inertia = useForm<TForm>(initialValues);
  const { touched, validator, setLastTouched, ...rest } =
    usePrecognition<TForm>(method, url, inertia.data, config);
  const passed = useMemo(
    () =>
      touched.filter(
        (field: FieldPath<TForm>) =>
          typeof inertia.errors[field] === 'undefined'
      ),
    [inertia.errors, touched]
  );

  const patchedForm = patchInertiaForm(method, url, inertia, validator);

  return {
    ...patchedForm,
    ...rest,
    validator,
    touched,
    setLastTouched,
    validateAndSetDataByKeyValuePair(name, value) {
      patchedForm.setData(name, value);
      setLastTouched(name);

      return this;
    },
    passed,
  };
}
