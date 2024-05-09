import { MenuItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    text: 'Github',
    to: '/',
  },
  {
    text: 'Contacts',
    to: '/',
  },
  {
    text: 'Rights',
    to: '/',
  },
].map((menuItem, key) => Object.assign(menuItem, { key }));
