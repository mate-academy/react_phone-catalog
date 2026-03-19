import { LANG } from '../lang';

export const SORT_BY = {
  age: 'age',
  title: 'title',
  price: 'price',
};

export const SORT_BY_OPTIONS = [
  { value: SORT_BY.age, title: 'sort.age' },
  { value: SORT_BY.title, title: 'sort.title' },
  { value: SORT_BY.price, title: 'sort.price' },
];

export const ITEMS_ON_PAGE_OPTIONS = [
  { value: 'all', title: 'items.all' },
  { value: '4', title: '4' },
  { value: '8', title: '8' },
  { value: '16', title: '16' },
];

export const LANG_OPTIONS = [
  { value: LANG.en, title: 'EN' },
  { value: LANG.ua, title: 'UA' },
];
