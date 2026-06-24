export type Category = 'phones' | 'tablets' | 'accessories';

export const CATEGORIES: Category[] = ['phones', 'tablets', 'accessories'];

export const isCategory = (value: unknown): value is Category =>
  typeof value === 'string' && CATEGORIES.includes(value as Category);
