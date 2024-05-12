import { assignKeys } from '../../../helpers/assignKeys';
import { MenuItem } from './types';

const MENU_ITEMS: Omit<MenuItem, 'key'>[] = [
  {
    text: 'Home',
    to: '/',
  },
  {
    text: 'Phones',
    to: '/phones',
  },
  {
    text: 'Tablets',
    to: '/tablets',
  },
  {
    text: 'Accessories',
    to: '/accessories',
  },
];

export const menuItems: MenuItem[] = assignKeys(MENU_ITEMS);
