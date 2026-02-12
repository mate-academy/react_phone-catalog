import { RoutePath } from '../types/RoutePath';

export type RouteConfig = {
  path: RoutePath;
  label?: string;
  icon?: string;
  breadcrumb?: {
    hide?: boolean;
    getLabel?: (params: Record<string, string>) => string;
    getLink?: (params: Record<string, string>) => string;
    isIcon?: boolean;
  };
  nav?: {
    hide?: boolean;
    isIcon?: boolean;
    isText?: boolean;
  };
};

export const ROUTES_CONFIG: RouteConfig[] = [
  {
    path: RoutePath.Home,
    label: 'home',
    icon: 'home',
    nav: { isText: true },
    breadcrumb: {
      isIcon: true,
    },
  },
  {
    path: RoutePath.Phones,
    label: 'phones',
    nav: { isText: true },
    breadcrumb: {},
  },
  {
    path: RoutePath.Phone,
    breadcrumb: {
      getLabel: ({ id }) => id,
      getLink: ({ id }) => `${RoutePath.Phones}/${id}`,
    },
  },
  {
    path: RoutePath.Tablets,
    label: 'tablets',
    nav: { isText: true },
    breadcrumb: {},
  },
  {
    path: RoutePath.Tablet,
    breadcrumb: {
      getLabel: ({ id }) => id,
      getLink: ({ id }) => `${RoutePath.Tablets}/${id}`,
    },
  },
  {
    path: RoutePath.Accessories,
    label: 'accessories',
    nav: { isText: true },
    breadcrumb: {},
  },
  {
    path: RoutePath.Accessory,
    breadcrumb: {
      getLabel: ({ id }) => id,
      getLink: ({ id }) => `${RoutePath.Accessories}/${id}`,
    },
  },
  {
    path: RoutePath.Favorites,
    label: 'favorites',
    icon: 'favorite',
    nav: { isIcon: true },
    breadcrumb: {},
  },
  {
    path: RoutePath.Cart,
    label: 'cart',
    icon: 'cart',
    nav: { isIcon: true },
    breadcrumb: {},
  },
];
