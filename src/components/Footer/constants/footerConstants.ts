import { TYPOGRAPHY } from '@/constants/typography';
import { cn } from '@/lib/utils';
import type { NavigationLink } from '../types/footerTypes';

export const GITHUB_URL =
  'https://github.com/online-store-2026/books-catalog-frontend';

export const LOGO_PATH = `${import.meta.env.BASE_URL}img/icons/Logo.svg`;
export const LOGO_ALT_TEXT = 'Codex logo';

export enum FooterRoute {
  Home = '/',
  Contacts = '/contacts',
  Rights = '/rights',
}

export enum FooterTranslationKey {
  Contacts = 'navigation.contacts',
  Rights = 'navigation.rights',
  BackToTop = 'navigation.backToTop',
}

export const NAVIGATION_LINKS: NavigationLink[] = [
  { to: GITHUB_URL, label: 'Github', isExternal: true },
  {
    to: FooterRoute.Contacts,
    translationKey: FooterTranslationKey.Contacts,
    label: 'Contacts',
  },
  {
    to: FooterRoute.Rights,
    translationKey: FooterTranslationKey.Rights,
    label: 'Rights',
  },
];

export const LINK_CLASS_NAME = cn(
  TYPOGRAPHY.uppercase,
  'no-underline text-input hover:text-popover transition-colors',
);
