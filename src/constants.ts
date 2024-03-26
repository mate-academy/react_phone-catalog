export const ProductsSliderLength = 7;

export const picturesSliderData = [
  {
    imgUrl: './_new/promo/slider2.png',
    linkUrl: '/phones?query=iphone+15&page=1',
  },
  { imgUrl: './_new/promo/slider3.png', linkUrl: '/tablets?query=ipad&page=1' },
  {
    imgUrl: './_new/promo/slider1.png',
    linkUrl: '/accessories?query=pods',
  },
  { imgUrl: './_new/promo/slider4.png', linkUrl: '/phones?query=titanium' },
  { imgUrl: './_new/promo/slider5.png', linkUrl: '/accessories' },
];

export const sortByVariants = [
  {
    title: 'Newest',
    params: { sort: 'age' },
  },
  {
    title: 'Alphabetically',
    params: { sort: 'name' },
  },
  {
    title: 'Cheapest',
    params: { sort: 'price' },
  },
];

export const perPageVariants = [
  {
    title: 'All',
    params: { perPage: null, page: '1' },
  },
  // {
  //   title: '2 test only',
  //   params: { perPage: '2', page: '1' },
  // },
  {
    title: '4',
    params: { perPage: '4', page: '1' },
  },
  {
    title: '8',
    params: { perPage: '8', page: '1' },
  },
  {
    title: '16',
    params: { perPage: '16', page: '1' },
  },
];
