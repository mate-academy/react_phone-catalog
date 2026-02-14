export type NavigationLinkType = {
  url: string;
  name: string;
};

export const NAVIGATION_LINKS: NavigationLinkType[] = [
  {
    url: '/',
    name: 'Home',
  },
  {
    url: '/catalog/phones',
    name: 'Phones',
  },
  {
    url: '/catalog/tablets',
    name: 'Tablets',
  },
  {
    url: '/catalog/accessories',
    name: 'Accessories',
  },
];
