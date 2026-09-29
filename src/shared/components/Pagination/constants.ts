import { SelectOption } from '@/shared/types';

export const PER_PAGE_ALL = 'all';
export const DEFAULT_PAGE = 1;
export const PER_PAGE_OPTIONS: SelectOption[] = [
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
  { value: PER_PAGE_ALL, label: 'All' },
];
