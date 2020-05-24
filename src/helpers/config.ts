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

export const defaultGood: Good = {
  age: 0,
  type: '',
  id: '',
  imageUrl: '',
  name: '',
  snippet: '',
  price: 0,
  discount: 0,
  screen: '',
  capacity: '',
  ram: '',
};

export const sortType = [
  {
    name: 'Low to High',
    field: 'price',
    type: 'number',
    isReverse: false,
  },
  {
    name: 'High to Low',
    field: 'price',
    type: 'number',
    isReverse: true,
  },
  {
    name: 'A to Z',
    field: 'name',
    type: 'string',
    isReverse: false,
  },
  {
    name: 'Z to A',
    field: 'name',
    type: 'string',
    isReverse: true,
  },
];

export const perPageDefault = 8;
