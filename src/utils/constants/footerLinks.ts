import { ROUTES } from './routes';

export type TLinks = {
  href: string;
  name: string;
  isExternal: boolean;
};

export const LINKS: TLinks[] = [
  {
    href: 'https://github.com/Galers',
    name: 'GitHub',
    isExternal: true,
  },
  {
    href: ROUTES.CONTACT,
    name: 'Contact',
    isExternal: false,
  },
  { href: ROUTES.RIGHTS, name: 'Rights', isExternal: false },
];
