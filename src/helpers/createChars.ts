import { Char } from '../types/Char';

export const createChars = (
  keys: string[],
  values: (string | string[])[],
): Char[] => (
  keys.map((key, index) => (
    { key, value: values[index] }
  ))
);
