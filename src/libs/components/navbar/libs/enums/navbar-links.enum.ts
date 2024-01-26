import { AppRoutes } from '../../../../enums';
import { NavbarLinkType } from '../types/navbar-links.type';

export const navbarLinks: NavbarLinkType[] = [
  {
    title: 'Home',
    url: AppRoutes.ROOT,
  },
  {
    title: 'Phones',
    url: AppRoutes.PHONES,
  },
  {
    title: 'Tablets',
    url: AppRoutes.TABLETS,
  },
  {
    title: 'Accessories',
    url: AppRoutes.ACCESSORIES,
  },
];
