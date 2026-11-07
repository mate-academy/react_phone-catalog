import type { Category } from '../types/category';

export const SORT_OPTIONS = ['Newest', 'Top rated', 'Price low', 'Price high'];

export const CATEGORY_TITLES: Record<Category, string> = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const MODEL_WORDS: Record<string, string> = {
  iphone: 'iPhone',
  ipad: 'iPad',
  watch: 'Apple Watch',
  se: 'SE',
  pro: 'Pro',
  max: 'Max',
  mini: 'Mini',
  plus: 'Plus',
};
