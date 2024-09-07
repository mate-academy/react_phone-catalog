<<<<<<< HEAD
import { ROUTES } from '@utils/constants/routes';
=======
import { ROUTES } from '../../../utils/constants/routes';
>>>>>>> 3d29229bf5a890910a3e7c1d3c6b79a9929789c2
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
