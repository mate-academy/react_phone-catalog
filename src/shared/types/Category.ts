export const Category = {
  PHONES: 'phones',
  TABLETS: 'tablets',
  ACCESSORIES: 'accessories',
} as const;

export type Category = (typeof Category)[keyof typeof Category];
