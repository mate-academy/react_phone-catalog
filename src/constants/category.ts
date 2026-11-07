import type { Category } from '../types/category';

type Categories = {
  PHONES: Category;
  TABLETS: Category;
  ACCESSORIES: Category;
};

export const CATEGORY: Categories = {
  PHONES: 'phones',
  TABLETS: 'tablets',
  ACCESSORIES: 'accessories',
};
