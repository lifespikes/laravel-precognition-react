/**
 * Taken from react-hook-form
 * @see https://github.com/react-hook-form/react-hook-form/blob/master/src/types/path/utils.ts
 */
interface File extends Blob {
  readonly lastModified: number;
  readonly name: string;
}

interface FileList {
  readonly length: number;
  item(index: number): File | null;
  [index: number]: File;
}

export type Primitive =
  | null
  | undefined
  | string
  | number
  | boolean
  | symbol
  | bigint;

export type BrowserNativeObject = Date | FileList | File;

export type UnPackAsyncDefaultValues<TFieldValues> =
  TFieldValues extends () => Promise<infer U> ? U : TFieldValues;
