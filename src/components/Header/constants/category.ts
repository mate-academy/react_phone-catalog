export const navigationItems = [
  'home',
  'phones',
  'tablets',
  'accessories',
] as const;

export type NavigationItem = (typeof navigationItems)[number];

export const navigationPaths: Record<NavigationItem, string> = {
  home: '/',
  phones: '/phones',
  tablets: '/tablets',
  accessories: '/accessories',
};
