
# @lifespikes/laravel-precognition-react

[<img src="https://img.shields.io/npm/types/react-keybinds?label=%20&amp;logo=typescript&amp;logoColor=white&amp;style=for-the-badge">
](#)

Set of React hooks that integrates [Laravel Precognition](https://github.com/laravel/framework/pull/44339) with Inertia.js and simple forms. <br>
The hooks are highly based on [laravel-precognition-vue](https://www.npmjs.com/package/laravel-precognition-vue?activeTab=readme).

# Install (TBD)

#### Using npm

```bash
npm i @lifespikes/laravel-precognition-react
```

#### Using Yarn

```bash
yarn @lifespikes/laravel-precognition-react
```

#### Using pnpm

```bash
pnpm @lifespikes/laravel-precognition-react
```

# Usage

### 1. Using with Inertia
The hooks uses [Inertia.js](https://inertiajs.com/) `useForm` form helper hook under the hood. So it'll return the same properties and methods as the `useForm` hook.

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

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
