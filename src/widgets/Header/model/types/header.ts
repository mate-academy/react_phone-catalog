import { ReactNode } from 'react';

export const TitlePagesEnum: { [key: string]: string } = {
  home: 'Welcome to Nice Gadgets store!',
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
  favorites: 'Favorites',
  cart: 'Cart',
};

export interface HeaderItemType {
  path: string;
  cildren: string | ReactNode;
  isIcon?: boolean;
}
