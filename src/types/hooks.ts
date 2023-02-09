import {
  Config,
  RequestMethods,
  Timeout,
  Validator,
} from 'laravel-precognition/dist/types';
import { Dispatch, SetStateAction } from 'react';
import { InertiaFormProps } from '@inertiajs/react/types/useForm';

export type UsePrecognitionFormProps<TForm = Record<string, any>> = {
  precognition: {
    method: RequestMethods;
    url: string;
    config?: Config;
  };

  form: {
    initialValues: TForm;
  };
};

export type UsePrecognitionReturn<TForm = Record<string, any>> = {
  validator: Validator;
  validate(name: keyof TForm): UsePrecognitionReturn<TForm>;
  isValidating: string | null;
  isProcessingValidation: boolean;
  lastTouched: keyof TForm | null;
  setLastTouched: Dispatch<SetStateAction<keyof TForm | null>>;
  touched: Array<keyof TForm>;

  setValidatorTimeout(duration: Timeout): UsePrecognitionReturn<TForm>;
};

export type InertiaPrecognitionFormProps<
  TForm extends Record<string, unknown>
> = InertiaFormProps<TForm> & UsePrecognitionReturn<TForm>;

export interface UseInertiaPrecognitionFormReturn<
  TForm extends Record<string, unknown>
> extends InertiaPrecognitionFormProps<TForm> {
  validateAndSetDataByKeyValuePair(
    name: keyof TForm,
    value: any
  ): UsePrecognitionReturn<TForm>;
  passed: Array<keyof TForm>;
}

export type UsePrecognitionFormReturn<TForm = Record<string, any>> =
  UsePrecognitionReturn<TForm> & {
    data: TForm;
    setData: Dispatch<SetStateAction<TForm>>;
    errors: Record<keyof TForm, string> | null;
    setErrors: Dispatch<SetStateAction<Record<keyof TForm, string> | null>>;
    clearErrors: () => void;
    validateAndSetDataByKeyValuePair(
      key: keyof TForm,
      value: any
    ): UsePrecognitionFormReturn<TForm>;
    passed: Array<keyof TForm>;
  };
