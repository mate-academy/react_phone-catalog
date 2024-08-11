import { SelectOption } from '../types';

export const getValidOption = <T extends SelectOption>(
  options: T[],
  target: string,
  fallback: T,
) => options.find(option => option.value === target) || fallback;
