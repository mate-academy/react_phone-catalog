export const Categories = {
  Phones: 'phones',
  Tablets: 'tablets',
  Accessories: 'accessories',
} as const;

export type CategoriesType = (typeof Categories)[keyof typeof Categories];
