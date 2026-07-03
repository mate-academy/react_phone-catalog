export type Category = 'phones' | 'tablets' | 'accessories';

export const categories: Category[] = ['phones', 'tablets', 'accessories'];

export const categoriesLinks: Record<Category, string> = {
  phones: '/phones',
  tablets: '/tablets',
  accessories: '/accessories',
};
