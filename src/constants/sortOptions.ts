import { Option } from '../types';

export const SORT_OPTIONS: Option[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'cheapest', label: 'Cheapest' },
  { value: 'expensive', label: 'Expensive' },
] as const;

export const DEFAULT_SORT_BY = SORT_OPTIONS[0].value;
