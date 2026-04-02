import { PathType, PerPageType, SortType } from '../types/Types';

export const navLinks: (keyof typeof PathType)[] = [
  'HOME',
  'PHONES',
  'TABLETS',
  'ACCESSORIES',
];

export const footerNav = [
  {
    textLink: 'github',
    href: 'https://github.com/Sertavr/react_phone-catalog',
  },
  {
    textLink: 'contacts',
    href: 'https://github.com/Sertavr/react_phone-catalog',
  },
  {
    textLink: 'rights',
    href: 'https://github.com/Sertavr/react_phone-catalog',
  },
];

export const SORT_OPTION = [
  { name: 'Newest', value: SortType.AGE },
  { name: 'Alphabetically', value: SortType.TITLE },
  { name: 'Cheapest', value: SortType.PRICE },
];

export const PER_PAGE_OPTIONS = [
  { name: 'All', value: null },
  { name: '4', value: PerPageType.FOUR },
  { name: '8', value: PerPageType.EIGHT },
  { name: '16', value: PerPageType.SIXTEEN },
];

export const SEARCHABLE_PATH = [
  PathType.PHONES,
  PathType.TABLETS,
  PathType.ACCESSORIES,
  PathType.FAVOURITES,
];
