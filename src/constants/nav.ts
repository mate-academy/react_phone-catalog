import { ROUTES } from '../router/routes';

export const HEADER_NAV_ITEMS = [
  { to: ROUTES.home, label: 'header.home' },
  { to: ROUTES.phones, label: 'header.phones' },
  { to: ROUTES.tablets, label: 'header.tablets' },
  { to: ROUTES.accessories, label: 'header.accessories' },
];

export const FOOTER_NAV_ITEMS = [
  {
    to: ROUTES.github,
    label: 'footer.github',
  },
  { to: ROUTES.contacts, label: 'footer.contacts' },
  { to: ROUTES.rights, label: 'footer.rights' },
];
