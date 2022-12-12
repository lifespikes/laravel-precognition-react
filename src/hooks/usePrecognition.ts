/**
 * This Hook is based on Laravel Precognition (Vue)
 * @see https://github.com/laravel/precognition-vue
 */
import { useEffect, useState } from 'react';
import precognitive from 'laravel-precognition';
import {
  Config,
  RequestMethods,
  Timeout,
} from 'laravel-precognition/dist/types';
import { UsePrecognitionReturn } from '../types';

export function usePrecognition<TForm = Record<string, any>>(
  method: RequestMethods,
  url: string,
  data: TForm,
  config?: Config
): UsePrecognitionReturn<TForm> {
  const [isValidating, setIsValidating] = useState<string | null>(null);
  const [isProcessingValidation, setIsProcessingValidation] = useState(false);
  const [touched, setTouched] = useState<Array<keyof TForm>>([]);
  const [lastTouched, setLastTouched] = useState<keyof TForm | null>(null);

  const validator = precognitive.validate((client) => {
    const lowerCasedMethod = method.toLowerCase();

    if (lowerCasedMethod === 'get' || lowerCasedMethod === 'delete') {
      return client[lowerCasedMethod](url, config);
    }

    return client[
      lowerCasedMethod as Exclude<RequestMethods, 'get' | 'delete'>
    ](url, data, config);
  });

  useEffect(() => {
    setIsValidating(validator.validating());
    setIsProcessingValidation(validator.processingValidation());
    setTouched(validator.touched() as unknown as Array<keyof TForm>);
  }, []);

  useEffect(() => {
    if (lastTouched) {
      validator.validate(lastTouched as unknown as string);
      setLastTouched(null);
    }
  }, [lastTouched]);

  validator.on('validatingChanged', () =>
    setIsValidating(validator.validating())
  );

  validator.on('processingValidationChanged', () =>
    setIsProcessingValidation(validator.processingValidation())
  );

  validator.on('touchedChanged', () =>
    setTouched(validator.touched() as unknown as Array<keyof TForm>)
  );

  return {
    validator,
    validate(name: keyof TForm) {
      setLastTouched(name);

      return this;
    },
    isValidating,
    isProcessingValidation,
    lastTouched,
    setLastTouched,
    touched,
    setValidatorTimeout(duration: Timeout) {
      validator.setTimeout(duration);
      return this;
    },
  };
}
