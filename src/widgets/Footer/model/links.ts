import { NavigationItem } from '@shared/types/NavLinkProps';
import {
  FooterLabelProp,
  FooterNavName,
  FooterRoutePath,
} from '../types/footerLinks';

export const linksList: NavigationItem[] = [
  {
    name: FooterNavName.Github,
    path: FooterRoutePath.Github,
    labelProp: FooterLabelProp.Github,
  },
  {
    name: FooterNavName.Contacts,
    path: FooterRoutePath.Contacts,
    labelProp: FooterLabelProp.Contacts,
  },
  {
    name: FooterNavName.Rights,
    path: FooterRoutePath.Rights,
    labelProp: FooterLabelProp.Rights,
  },
];
