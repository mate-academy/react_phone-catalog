export const imgSrcFavourite = {
  default: '/icons/favourite_default.svg',
  hover: '/icons/favourite_hover.svg',
  active: '/icons/favourite_active.svg',
};

export type Category = 'phones' | 'tablets' | 'accessories';

export const categoryMap: Record<Category, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};
