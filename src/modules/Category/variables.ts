/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { SelectOption } from '../../types';

export type QuerySelectOption = SelectOption & {
  default: boolean;
};

export const TAKE_SELECT_OPTIONS: QuerySelectOption[] = [
  { label: '4', value: String(4), default: false },
  { label: '8', value: String(8), default: false },
  { label: '16', value: String(16), default: false },
  { label: 'All', value: String(Infinity), default: true },
];

export const takeSelectDefaultOption = TAKE_SELECT_OPTIONS.find(
  option => option.default,
)!;

export const SORT_VALUES = {
  title: 'title',
  price: 'price',
  age: 'age',
} as const;

export const SORT_SELECT_OPTIONS: (QuerySelectOption & {
  value: keyof typeof SORT_VALUES;
})[] = [
  { label: 'Alphabetically', value: SORT_VALUES.title, default: false },
  { label: 'Cheapest', value: SORT_VALUES.price, default: false },
  { label: 'Newest', value: SORT_VALUES.age, default: true },
];

export const sortSelectDefaultOption = SORT_SELECT_OPTIONS.find(
  option => option.default,
)!;

export const QUERY_KEY = {
  SEARCH: 'query',
  TAKE: 'take',
  SORT: 'sort',
  PAGE: 'page',
};
