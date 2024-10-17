import { ROUTES } from '@utils/constants/routes';
import { IMenuLink } from '../nav-links/navLinks-items.interface';

export const DATA_MENU: IMenuLink[] = [
  {
    link: ROUTES.HOME,
    name: 'home',
  },
  {
    link: `${ROUTES.CATEGORIES}/${ROUTES.PHONES}`,
    name: 'phones',
  },
  {
    link: `${ROUTES.CATEGORIES}/${ROUTES.TABLETS}`,
    name: 'tablets',
  },
  {
    link: `${ROUTES.CATEGORIES}/${ROUTES.ACCESSORIES}`,
    name: 'accessories',
  },
];
