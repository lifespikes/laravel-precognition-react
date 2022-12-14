
# @lifespikes/laravel-precognition-react

[<img src="https://img.shields.io/npm/v/@lifespikes/laravel-precognition-react?style=for-the-badge">](https://www.npmjs.com/package/@lifespikes/laravel-precognition-react)
<img src="https://img.shields.io/npm/types/@lifespikes/laravel-precognition-react?label=%20&amp;logo=typescript&amp;logoColor=white&amp;style=for-the-badge">
<img src="https://img.shields.io/npm/dt/@lifespikes/laravel-precognition-react?style=for-the-badge" >
[<img src="https://img.shields.io/bundlephobia/minzip/@lifespikes/laravel-precognition-react?style=for-the-badge">](https://bundlephobia.com/package/@lifespikes/laravel-precognition-react)


A set of React hooks that integrates [Laravel Precognition](https://github.com/laravel/framework/pull/44339) with Inertia.js and simple forms. <br>
The hooks are highly based on [laravel-precognition-vue](https://www.npmjs.com/package/laravel-precognition-vue?activeTab=readme).

# Install

#### Using npm

```bash
npm i @lifespikes/laravel-precognition-react
```

#### Using Yarn

```bash
yarn add @lifespikes/laravel-precognition-react
```

#### Using pnpm

```bash
pnpm @lifespikes/laravel-precognition-react
```

# Usage
The package provides two hooks: `usePrecognitionForm` and `useInertiaPrecognitionForm`.

Both hooks receive a `props` object, that follows the following structure:

```typescript
{
  precognition: { // This is where the precognition configuration
    method: 'put' // PUT, PATCH, POST, DELETE 
    url: 'https://example.com' // URL to send the precognition request
  },
  form: {
    initialValues: {
      example: 'value value'
    } // Initial values of the form
  }
}
```

Also, both hooks return the next properties and methods related to the `usePrecognition` hook:

- `validator` - The validator instance
- `validate(name)` - Validate a specific field
- `isValidating` - Whether the form is validating
- `isProcessingValidation` - Whether the form is processing the validation
- `lastTouched` - The last touched field
- `setLastTouched` - Set the last touched field(This will also trigger the validation)
- `touched` - The touched fields,
- `setValidatorTimeout(duration)` - Set the timeout for the validation.

### 1. Using with Inertia
For using with Inertia.js, you need to import `useInertiaPrecognitionForm` hook. <br>

The `useInertiaPrecognitionForm` hook uses [Inertia.js](https://inertiajs.com/forms) `useForm` form helper hook under the hood. So it'll return the same properties and methods as the `useForm` hook.

#### Usage example:
```tsx
import React, { ChangeEvent, FormEvent } from 'react';
import {useInertiaPrecognitionForm} from '@lifespikes/laravel-precognition-react';

type FormFields = {
    name: string;
    email: string;
}

const ExampleForm = () => {
  const route = 'https://example.com/user/1';
  const {
    data,
    setData,
    put,
    processing,
    errors,
    validateAndSetDataByKeyValuePair,
    isProcessingValidation,
  } = useInertiaPrecognitionForm<FormFields>({
    precognition: {
      method: 'put',
      url: route,
    },
    form: {
      initialValues: {
        name: '',
        email: '',
      },
    },
  });

  const onHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // This will validate the input and update the form data
    validateAndSetDataByKeyValuePair(
        event.target.name as keyof FormFields,
        event.target.value,
    );
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    return put(route, {
      onSuccess: () => {
        setData({
          name: '',
          email: '',
        });
      },
    });
  };
  
  return (
    <form onSubmit={onSubmit}>
      <div>
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={onHandleChange}
        />
        {errors.name ? <p>{errors.name}</p> : null}
      </div>
      <div>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={onHandleChange}
        />
        {errors.name ? <p>{errors.email}</p>: null}
      </div>
      <button type="submit" disabled={processing || isProcessingValidation}>
        Submit
      </button>
    </form>
  );
}
```

### 2. Using with a simple form

This is a small example of the usage of the `usePrecognitionForm` hook with a simple/basic form.

Also, this hook returns the following additional properties:

- `data` - The form data.
- `setData` - A function that sets the form data.
- `errors` - The form errors.
- `setErrors` - A function that sets the form errors.
- `clearErrors` - A function that clears the form errors.

#### Usage example:
```tsx
import React, { ChangeEvent, FormEvent } from 'react';
import {usePrecognitionForm} from '@lifespikes/laravel-precognition-react';

type FormFields = {
  name: string;
  email: string;
}

const ExampleForm = () => {
  const route = 'https://example.com/user/1';
  const {
    data,
    setData,
    errors,
    validateAndSetDataByKeyValuePair,
    isProcessingValidation,
  } = usePrecognitionForm<FormFields>({
    precognition: {
      method: 'put',
      url: route,
    },
    form: {
      initialValues: {
        name: '',
        email: '',
      },
    },
  });

  const onHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // This will validate the input and update the form data
    validateAndSetDataByKeyValuePair(
        event.target.name as keyof FormFields,
        event.target.value,
    );
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Implement your own logic here
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={onHandleChange}
        />
        {errors.name ? <p>{errors.name}</p> : null}
      </div>
      <div>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={onHandleChange}
        />
        {errors.name ? <p>{errors.email}</p>: null}
      </div>
      <button type="submit" disabled={processing || isProcessingValidation}>
        Submit
      </button>
    </form>
  );
}
```

## Notes

- This is not an official package. It's just a personal attempt to create a package that integrates Laravel Precognition with React.
