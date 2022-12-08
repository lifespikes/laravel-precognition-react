import { useForm } from '@inertiajs/inertia-react';
import { useMemo } from 'react';
import {
  UseInertiaPrecognitionForm,
  UsePrecognitionFormOptions,
} from '../types';
import { usePrecognition } from './usePrecognition';
import { patchInertiaForm } from '../helpers/patchInertiaForm';

export const useInertiaPrecognitionForm = <TForm = Record<string, any>>({
  precognition: { method, url, config },
  form: { initialValues },
}: UsePrecognitionFormOptions<TForm>): UseInertiaPrecognitionForm<TForm> => {
  const inertia = useForm<TForm>(initialValues);
  const { touched, validator, setLastTouched, ...rest } =
    usePrecognition<TForm>(method, url, inertia.data, config);
  const passed = useMemo(
    () =>
      touched.filter(
        (field: keyof TForm) => typeof inertia.errors[field] === 'undefined'
      ),
    [inertia.errors, touched]
  );

  const patchedForm = patchInertiaForm(method, url, inertia, validator);

  return Object.assign(patchedForm, {
    ...rest,
    validateAndSetDataByKeyValuePair(name: keyof TForm, value: any) {
      patchedForm.setData(name, value);
      setLastTouched(name);

      return this;
    },
    validator,
    touched,
    passed,
    setLastTouched,
  });
};
