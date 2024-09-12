import { ROUTES } from '@utils/constants/routes';
import { IMenuLink } from '../nav-links/navLinks-items.interface';

export const menu: IMenuLink[] = [
  {
    link: ROUTES.HOME,
    name: 'HOME',
  },
  {
    link: ROUTES.PHONES,
    name: 'PHONES',
  },
  {
    link: ROUTES.TABLETS,
    name: 'TABLETS',
  },
  {
    link: ROUTES.ACCESSORIES,
    name: 'ACCESSORIES',
  },
];
