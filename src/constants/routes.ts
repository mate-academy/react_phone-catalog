export const ROUTES = {
  home: '/',
  phones: '/phones',
  tablets: '/tablets',
  accessories: '/accessories',
  favorites: '/favorites',
  cart: '/cart',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
