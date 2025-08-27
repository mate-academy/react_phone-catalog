export enum Nav {
  home = 'home',
  phone = 'phones',
  tablets = 'tablets',
  accessories = 'accessories',
}

export interface NavLinkItem {
  label: string;
  path: string;
}

export const navLinks: NavLinkItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Phones', path: '/phones' },
  { label: 'Tablets', path: '/tablets' },
  { label: 'Accessories', path: '/accessories' },
  { label: 'Favorites', path: '/favorites' },
  { label: 'Cart', path: '/cart' },
];
