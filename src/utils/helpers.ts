import { Category } from '../types/Category';

export const containsSubstring = (
  str: string,
  substring: Category,
): boolean => {
  return str.toLowerCase().includes(substring.toLowerCase());
};
