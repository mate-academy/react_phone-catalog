import { SortType } from '../types/SortType';
import { Option } from '../types/Option';

export const SORT: SortType = {
  NEWEST: 'Newest',
  OLDEST: 'Oldest',
  PRICE_HIGH_TO_LOW: 'Price high-to-low',
  PRICE_LOW_TO_HIGH: 'Price low-to-high',
  ALPHABETICALLY: 'Alphabetically',
};

export const sortingOptions = [
  { value: SORT.NEWEST, label: 'Newest' },
  { value: SORT.OLDEST, label: 'Newest' },
  { value: SORT.ALPHABETICALLY, label: 'Alphabetically' },
  { value: SORT.PRICE_HIGH_TO_LOW, label: 'Cheapest' },
  { value: SORT.PRICE_LOW_TO_HIGH, label: 'Cheapest' },
];

export const optionsSorBy: Option[] = [
  { label: 'Newest', value: SORT.NEWEST },
  { label: 'Oldest', value: SORT.OLDEST },
  { label: 'Price high-to-low', value: SORT.PRICE_HIGH_TO_LOW },
  { label: 'Price low-to-high', value: SORT.PRICE_LOW_TO_HIGH },
  { label: 'Alphabetically', value: SORT.ALPHABETICALLY },
];
