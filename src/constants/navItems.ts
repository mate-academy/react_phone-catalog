import { ROUTES } from './routes';

export const NAV_ITEMS = [
  {
    labelKey: 'home',
    path: ROUTES.home,
  },
  {
    labelKey: 'phones',
    path: ROUTES.phones,
  },
  {
    labelKey: 'tablets',
    path: ROUTES.tablets,
  },
  {
    labelKey: 'accessories',
    path: ROUTES.accessories,
  },
] as const;
