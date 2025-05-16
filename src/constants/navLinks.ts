type LinkItem = {
  path: string;
  text: string;
  categoryKey: string;
  pageTitle: string;
};

export const navLinks: LinkItem[] = [
  {
    path: '/',
    text: 'Home',
    categoryKey: 'home',
    pageTitle: 'Home',
  },
  {
    path: '/phones',
    text: 'Phones',
    categoryKey: 'phones',
    pageTitle: 'Phones',
  },
  {
    path: '/tablets',
    text: 'Tablets',
    categoryKey: 'tablets',
    pageTitle: 'Tablets',
  },
  {
    path: '/accessories',
    text: 'Accessories',
    categoryKey: 'accessories',
    pageTitle: 'Accessories',
  },
];
