import { Category } from '../../../types';

export const PRODUCTS_PAGE_TITLES: Record<Category, string> = {
  [Category.Phones]: 'Mobile phones',
  [Category.Accessories]: 'Accessories',
  [Category.Tablets]: 'Tablets',
} as const;
