export const CATEGORY_LIST = {
  tablets: 'tablets',
  accessories: 'accessories',
  phones: 'phones',
} as const;

const INITIAL_PATH = '/img/';

export const CATEGORY_IMG_PATH = {
  tablets: INITIAL_PATH + 'category-tablets.webp',
  accessories: INITIAL_PATH + 'category-accessories.webp',
  phones: INITIAL_PATH + 'category-phones.webp',
} as const;

export type Category = keyof typeof CATEGORY_LIST;
