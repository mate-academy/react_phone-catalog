export const CategoryNames = {
  phones: 'phones',
  tablets: 'tablets',
  accessories: 'accessories',
} as const;

export type Category = keyof typeof CategoryNames;
