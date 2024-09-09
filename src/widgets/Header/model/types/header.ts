import { ReactNode } from 'react';
import { CategoriesEnum } from '../../../../entities/Categories';

type TitleKey =
  | 'home'
  | 'phones'
  | 'tablets'
  | 'accessories'
  | 'favorites'
  | 'cart';

export const TitlePagesEnum: Record<TitleKey | CategoriesEnum, string> = {
  home: 'Welcome to Nice Gadgets store!',
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
  favorites: 'Favorites',
  cart: 'Cart',
};

export interface HeaderItemType {
  path: string;
  children: string | ReactNode;
  isIcon?: boolean;
}
