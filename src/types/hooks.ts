import {
  Config,
  RequestMethods,
  Timeout,
  Validator,
} from 'laravel-precognition/dist/types';
import { Dispatch, SetStateAction } from 'react';
import { InertiaFormProps } from '@inertiajs/inertia-react';
import {
  FieldPath,
  FieldPaths,
  FieldPathValue,
  FieldValues,
} from './path/eager';

export type UsePrecognitionFormProps<TForm extends FieldValues = FieldValues> =
  {
    precognition: {
      method: RequestMethods;
      url: string;
      config?: Config;
    };

    form: {
      initialValues: TForm;
    };
  };

export type UsePrecognitionReturn<TForm extends FieldValues = FieldValues> = {
  validator: Validator;
  validate(name: FieldPath<TForm>): UsePrecognitionReturn<TForm>;
  isValidating: string | null;
  isProcessingValidation: boolean;
  lastTouched: FieldPath<TForm> | null;
  setLastTouched: Dispatch<SetStateAction<FieldPath<TForm> | null>>;
  touched: FieldPaths<TForm>;

  setValidatorTimeout(duration: Timeout): UsePrecognitionReturn<TForm>;
};

export type InertiaPrecognitionFormProps<
  TForm extends FieldValues = FieldValues
> = InertiaFormProps<TForm>;

export type UseInertiaPrecognitionFormReturn<
  TForm extends FieldValues = FieldValues
> = InertiaPrecognitionFormProps<TForm> &
  UsePrecognitionReturn<TForm> & {
    validateAndSetDataByKeyValuePair<
      TName extends FieldPath<TForm> = FieldPath<TForm>
    >(
      name: TName,
      value: FieldPathValue<TForm, TName>
    ): UseInertiaPrecognitionFormReturn<TForm>;
    passed: FieldPaths<TForm>;
  };

export type UsePrecognitionFormReturn<TForm extends FieldValues = FieldValues> =
  UsePrecognitionReturn<TForm> & {
    data: TForm;
    setData: Dispatch<SetStateAction<TForm>>;
    errors: Record<FieldPath<TForm>, string> | null;
    setErrors: Dispatch<
      SetStateAction<Record<FieldPath<TForm>, string> | null>
    >;
    clearErrors: () => void;
    validateAndSetDataByKeyValuePair<
      TName extends FieldPath<TForm> = FieldPath<TForm>
    >(
      name: TName,
      value: FieldPathValue<TForm, TName>
    ): UsePrecognitionFormReturn<TForm>;
    passed: FieldPaths<TForm>;
  };
