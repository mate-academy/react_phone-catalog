import { Option } from '../../types/Options';

export const CATEGORIES = {
  phones: {
    path: '/phones',
    name: 'Phones',
    title: 'Mobile phones',
    imgSrc: 'img/home-phones.png',
  },
  tablets: {
    path: '/tablets',
    name: 'Tablets',
    title: 'Tablets',
    imgSrc: 'img/home-tablets.png',
  },
  accessories: {
    path: '/accessories',
    name: 'Accessories',
    title: 'Accessories',
    imgSrc: 'img/home-accessories.png',
  },
};

export const SORT_OPTIONS: Option[] = [
  { value: 'age', label: 'Newest' },
  { value: 'title', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

export const PER_PAGE_OPTIONS: Option[] = [
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
  { value: 'all', label: 'All' },
];

export const DEFAULT_SEARCH_PARAMS = {
  sort: 'age',
  perPage: 'all',
  page: '1',
  query: '',
};
