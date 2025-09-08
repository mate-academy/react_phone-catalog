export type Category = 'phones' | 'tablets' | 'accessories';
export const isCategory = (v: unknown): v is Category =>
  v === 'phones' || v === 'tablets' || v === 'accessories';

export const TITLES: Record<Category, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};
