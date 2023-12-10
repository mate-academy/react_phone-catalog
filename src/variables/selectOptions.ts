import { SelectOption } from '../types/SelectOption';

export const sortByOptions: SelectOption[] = [
  {
    id: 0,
    name: 'Newest',
    value: 'age',
  },
  {
    id: 1,
    name: 'Alphabetically',
    value: 'name',
  },
  {
    id: 2,
    name: 'Cheapest',
    value: 'price',
  },
];

export const perPageOptions: SelectOption[] = [
  {
    id: 0,
    name: 'All',
    value: 'all',
  },
  {
    id: 1,
    name: '4',
    value: '4',
  },
  {
    id: 2,
    name: '8',
    value: '8',
  },
  {
    id: 3,
    name: '16',
    value: '16',
  },
];
