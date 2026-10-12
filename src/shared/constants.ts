import { Breadcrumb } from '@/shared/types';

export const BREAKPOINTS = {
  tablet: 640,
  desktop: 1024,
  large: 1440,
} as const;

export const QUERY_PARAMS = {
  sort: 'sort',
  page: 'page',
  perPage: 'perPage',
} as const;

export const ROUTES = {
  HOME: '/',
  PHONES: '/phones',
  TABLETS: '/tablets',
  ACCESSORIES: '/accessories',
  FAVORITES: '/favorites',
  CART: '/cart',
} as const;

export const baseBreadcrumbs: Breadcrumb[] = [
  { name: 'Phones', to: ROUTES.PHONES },
  { name: 'Tablets', to: ROUTES.TABLETS },
  { name: 'Accesories', to: ROUTES.ACCESSORIES },
  { name: 'Favorites', to: ROUTES.FAVORITES },
  { name: 'Cart', to: ROUTES.CART },
];

export const languages = [
  { code: 'en', label: 'EN' },
  { code: 'ua', label: 'UA' },
] as const;
