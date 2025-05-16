import { Option } from '../types';

export const ITEMS_PER_PAGE_OPTIONS: Option[] = [
  { value: '12', label: '12' },
  { value: '24', label: '24' },
  { value: '36', label: '36' },
  { value: '48', label: '48' },
  { value: 'all', label: 'All' },
] as const;

export const DEFAULT_ITEMS_PER_PAGE = ITEMS_PER_PAGE_OPTIONS[1].value;
