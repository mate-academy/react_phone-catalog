export const CATEGORIES = {
  PHONES: 'phones',
  TABLETS: 'tablets',
  ACCESSORIES: 'accessories',
} as const;

export const CATEGORY_NAMES = {
  [CATEGORIES.PHONES]: 'Phones',
  [CATEGORIES.TABLETS]: 'Tablets',
  [CATEGORIES.ACCESSORIES]: 'Accessories',
} as const;
