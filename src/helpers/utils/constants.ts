export const BASE_URL
  = 'https://mate-academy.github.io/react_phone-catalog/_new/';

export const addresses1 = {
  '39-B, Horiva str ': [50.468990, 30.518601],
  '37, Romana Ratushnogo str': [50.4233251269249, 30.488745521614483],
};

export const addresses = [
  {
    address: '39-B, Horiva str ',
    coordinates: [50.468990, 30.518601],
    schedule: 'Sun-Fri: 9:00 - 20:00',
    email: 'nice_app_store@gmail.com',
    tel: +380933394333,
  },
  {
    address: '37, Romana Ratushnogo str',
    coordinates: [50.4233251269249, 30.488745521614483],
    schedule: 'Sun-Wed, Fri: 9:00 - 20:00',
    email: 'nice_app_store@gmail.com',
    tel: +380937756777,
  },
];

export const banners = [
  './img/banners/banner-phones.png',
  './img/banners/banner-tablets.png',
  './img/banners/banner-accessories.png',
];

export const categoryImages = [
  './img/categories/category-phones.png',
  './img/categories/category-tablets.png',
  './img/categories/category-accessories.png',
];

export const pageSortOptions = {
  4: '4',
  8: '8',
  16: '16',
  All: 'All',
};

export const namedSortOptions = {
  age: 'Newest',
  name: 'Alphabetically',
  price: 'Cheapest',
};
