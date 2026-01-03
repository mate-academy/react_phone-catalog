export const SORT_VALUES = [
  'newest',
  'oldest',
  'alpha-asc',
  'alpha-desc',
  'price-low-high',
  'price-high-low',
] as const;

export type SortValue = (typeof SORT_VALUES)[number];

export interface SelectOption {
  value: SortValue;
  label: string;
}

export const sortOptions: SelectOption[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'alpha-asc', label: 'A-Z, alphabet' },
  { value: 'alpha-desc', label: 'Z-A, alphabet' },
  { value: 'price-low-high', label: 'Price: Low to High' },
  { value: 'price-high-low', label: 'Price: High to Low' },
];
