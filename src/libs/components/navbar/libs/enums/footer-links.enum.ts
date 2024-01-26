import { AppRoutes, ExternalLinks } from '../../../../enums';
import { NavbarLinkType } from '../types/navbar-links.type';

export const footerLinks: NavbarLinkType[] = [
  {
    title: 'Github',
    url: ExternalLinks.GITHUB,
  },
  {
    title: 'Contacts',
    url: AppRoutes.CONTACTS,
  },
  {
    title: 'Rights',
    url: AppRoutes.RIGHTS,
  },
];
