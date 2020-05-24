export const sectionsLinks: Link[] = [
  {
    name: 'Home',
    title: 'Store',
    url: '/',
    exact: true,
  },
  {
    name: 'Phones',
    title: 'Mobile Phones',
    url: '/phones',
    type: 'phone',
  },
  {
    name: 'Tablets',
    title: 'Tablets',
    url: '/tablets',
    type: 'tablet',
  },
  {
    name: 'Accessories',
    title: 'Accessories',
    url: '/accessories',
    type: 'accessories',
  },
];

export const footerLinks: Link[] = [
  {
    name: 'Github',
    url: '/github',
  },
  {
    name: 'Contacts',
    url: '/contacts',
  },
  {
    name: 'Rights',
    url: '/rights',
  },
];

export const Banners: Banners[] = [
  { alt: 'First banner', path: '/images/banner.jpg' },
  { alt: 'Second banner', path: '/images/banner2.jpg' },
  { alt: 'Third banner', path: '/images/banner3.jpg' },
];

export const perPageDefault = 8;

export const perPageSettings = [
  {
    name: '8',
  },
  {
    name: '12',
  },
  {
    name: '16',
  },
];
