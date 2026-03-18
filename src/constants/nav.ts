import { ROUTES } from '../router/routes';

export const HEADER_NAV_ITEMS = [
  { to: '/', label: 'header.home' },
  { to: '/phones', label: 'header.phones' },
  { to: '/tablets', label: 'header.tablets' },
  { to: '/accessories', label: 'header.accessories' },
];

export const FOOTER_NAV_ITEMS = [
  {
    to: ROUTES.github,
    label: 'footer.github',
  },
  { to: ROUTES.contacts, label: 'footer.contacts' },
  { to: ROUTES.rights, label: 'footer.rights' },
];
