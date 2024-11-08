import { ROUTES } from '@utils/constants/routes';

import { IMenuLink } from '../nav-links/navLinks-items.interface';

export const LINKS_MENU: IMenuLink[] = [
  {
    link: ROUTES.HOME,
    name: 'home',
  },
  {
    link: ROUTES.PHONES,
    name: 'phones',
  },
  {
    link: ROUTES.TABLETS,
    name: 'tablets',
  },
  {
    link: ROUTES.ACCESSORIES,
    name: 'accessories',
  },
];
