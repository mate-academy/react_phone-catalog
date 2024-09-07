import { ROUTES } from '@utils/constants/routes';
import { IMenuLink } from './menu-item/menu-item.interface';

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
