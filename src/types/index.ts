import {
  Config,
  RequestMethods,
  Timeout,
  Validator,
} from 'laravel-precognition/dist/types';
import React from 'react';
import { InertiaFormProps } from '@inertiajs/inertia-react';

export type UsePrecognitionFormOptions<TForm = Record<string, any>> = {
  precognition: {
    method: RequestMethods;
    url: string;
    config?: Config;
  };

  form: {
    initialValues: TForm;
  };
};

export type UsePrecognition<TForm = Record<string, any>> = {
  validator: Validator;
  validate(name: keyof TForm): UsePrecognition<TForm>;
  isValidating: string | null;
  isProcessingValidation: boolean;
  lastTouched: keyof TForm | null;
  setLastTouched: React.Dispatch<React.SetStateAction<keyof TForm | null>>;
  touched: Array<keyof TForm>;

  setValidatorTimeout(duration: Timeout): UsePrecognition<TForm>;
};

export type InertiaPrecognitionFormProps<TForm = Record<string, any>> =
  InertiaFormProps<TForm> & UsePrecognition<TForm>;

export interface UseInertiaPrecognitionForm<TForm = Record<string, any>>
  extends InertiaPrecognitionFormProps<TForm> {
  validateAndSetDataByKeyValuePair(
    name: keyof TForm,
    value: any
  ): UsePrecognition<TForm>;
  passed: Array<keyof TForm>;
}

export type UsePrecognitionForm<TForm = Record<string, any>> =
  UsePrecognition<TForm> & {
    data: TForm;
    setData: React.Dispatch<React.SetStateAction<TForm>>;
    errors: Record<keyof TForm, string> | null;
    setErrors: React.Dispatch<
      React.SetStateAction<Record<keyof TForm, string> | null>
    >;
    clearErrors: () => void;
    validateAndSetDataByKeyValuePair(
      key: keyof TForm,
      value: any
    ): UsePrecognitionForm<TForm>;
    passed: Array<keyof TForm>;
  };
