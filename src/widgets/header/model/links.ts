import { NavigationItem } from '@shared/types/NavLinkProps';
import {
  HeaderLabelProp,
  HeaderNavName,
  HeaderRoutePath,
} from '../types/headerLinks';

export const linksList: NavigationItem[] = [
  {
    name: HeaderNavName.Home,
    path: HeaderRoutePath.Home,
    labelProp: HeaderLabelProp.Home,
  },
  {
    name: HeaderNavName.Phones,
    path: HeaderRoutePath.Phones,
    labelProp: HeaderLabelProp.Phones,
  },
  {
    name: HeaderNavName.Tablets,
    path: HeaderRoutePath.Tablets,
    labelProp: HeaderLabelProp.Tablets,
  },
  {
    name: HeaderNavName.Accessories,
    path: HeaderRoutePath.Accessories,
    labelProp: HeaderLabelProp.Accessories,
  },
];
