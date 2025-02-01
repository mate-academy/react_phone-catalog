import { DropdownItem } from '../../../_types/dropDown';
import { PerPage } from '../../../_types/PerPage';

export const SORT_OPTIONS: DropdownItem[] = [
  { label: 'Newest', params: { sort: 'age' }, value: 'age' },
  { label: 'Alphabetically', params: { sort: 'id' }, value: 'id' },
  {
    label: 'Cheapest',
    params: { sort: 'price' },
    value: 'price',
  },
];

export const PAGINATION_OPTIONS: DropdownItem[] = [
  { label: 'all', params: { perPage: null }, value: 'all' },
  { label: '4', params: { perPage: PerPage.four }, value: PerPage.four },
  { label: '8', params: { perPage: PerPage.eight }, value: PerPage.eight },
  { label: '16', params: { perPage: PerPage.sixteen }, value: PerPage.sixteen },
];
