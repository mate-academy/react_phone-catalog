import { SortType } from '../types/SortType';

export type SelectSortLink = {
  value: SortType;
  title: string;
};

export type SelectAmountLink = {
  value: string;
  title: string
};

export const selectSortLink: SelectSortLink[] = [
  { value: SortType.NEWEST, title: 'Newest' },
  { value: SortType.NAME, title: 'Alphabetically' },
  { value: SortType.PRICE_ASC, title: 'Cheapest' },
  { value: SortType.PRICE_DESC, title: 'Most expensive' },
];

export const selectAmountLink: SelectAmountLink[] = [
  { value: '4', title: '4' },
  { value: '8', title: '8' },
  { value: '16', title: '16' },
  { value: 'All', title: 'All' },
];
