import { NavLinkItem } from '../types';

export const NAV_LINKS: readonly NavLinkItem[] = [
  { path: '/', name: 'Home' },
  { path: '/phones', name: 'Phones' },
  { path: '/tablets', name: 'Tablets' },
  { path: '/accessories', name: 'Accessories' },
] as const;
