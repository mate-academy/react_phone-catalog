import { ROUTES } from '@routes/index';
import type { MenuItem } from 'types/navigationTypes';

export const menuItems: MenuItem[] = [
  { id: 1, title: 'Home', path: ROUTES.HOME },
  { id: 2, title: 'Phones', path: ROUTES.PHONES },
  { id: 3, title: 'Tablets', path: ROUTES.TABLETS },
  { id: 4, title: 'Accessories', path: ROUTES.ACCESSORIES },
];
