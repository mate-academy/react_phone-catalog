import { Option } from '../../types/Option';

export const optionsItemsPerPage: Option[] = [
  { value: '4', criteria: '4' },
  { value: '8', criteria: '8' },
  { value: '16', criteria: '16' },
  { value: 'All', criteria: 'all' },
];

export const optionsSortBy: Option[] = [
  { value: 'Newest', criteria: 'age' },
  { value: 'Alphabetically', criteria: 'title' },
  { value: 'Cheapest', criteria: 'price' },
];
