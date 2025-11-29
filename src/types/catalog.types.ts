// types/catalog.types.ts
export type CategoryType = 'phones' | 'tablets' | 'accessories';

export const CATEGORIES: Record<CategoryType, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const CATEGORY_API_ENDPOINTS: Record<CategoryType, string> = {
  phones: '/api/phones.json',
  tablets: '/api/tablets.json',
  accessories: '/api/accessories.json',
};
