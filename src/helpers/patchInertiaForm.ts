import {
  RequestMethods,
  SimpleValidationErrors,
  ValidationErrors,
  Validator,
} from 'laravel-precognition/dist/types';
import { toSimpleValidationErrors } from 'laravel-precognition';
import { Method, VisitOptions } from '@inertiajs/core';
import { InertiaFormProps } from '@inertiajs/react';

const getOptionsWithValidator = (
  validator: Validator,
  options?: VisitOptions
) => {
  const _options = options || {};

  return {
    ..._options,
    onError: (errors: ValidationErrors | SimpleValidationErrors) => {
      validator.setErrors(errors);

      if (options?.onError) {
        options.onError(errors as unknown as any);
      }
    },
  };
};

export const patchInertiaForm = <TForm = Record<string, any>>(
  method: RequestMethods,
  url: string,
  form: InertiaFormProps<TForm>,
  validator: Validator
): InertiaFormProps<TForm> => {
  const binds = {
    submit: form.submit.bind(form),
    get: form.get.bind(form),
    put: form.put.bind(form),
    post: form.post.bind(form),
    delete: form.delete.bind(form),
    patch: form.patch.bind(form),
  };

  validator.on('validatingChanged', () => {
    form.clearErrors();
    form.setError(
      toSimpleValidationErrors(validator.errors()) as unknown as Record<
        keyof TForm,
        string
      >
    );
  });

  const bindsFactory = Object.keys(binds)
    .filter((bind) => bind !== 'submit')
    .reduce((acc, item) => {
      const obj: Record<string, any> = {};

      obj[item] = (u: string, o?: VisitOptions) => {
        const options = getOptionsWithValidator(validator, o);

        binds[item as Exclude<keyof typeof binds, 'submit'>](u, options);
      };

      return {
        ...acc,
        ...obj,
      };
    }, {});

  return Object.assign(form, {
    ...bindsFactory,
    submit(m: RequestMethods, u: string, o?: VisitOptions) {
      const hasDifferentMethod = m.length > 0;
      const options = getOptionsWithValidator(validator, o);

      binds.submit(
        (hasDifferentMethod ? m : method) as Method,
        hasDifferentMethod ? url : u,
        options
      );
    },
  });
};
