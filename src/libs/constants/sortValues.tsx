import { SortType } from '../types/sortType.enum';

export const SORT_OPTIONS = Object.entries(SortType).map(([key, value]) => ({
  value,
  label: key,
}));
