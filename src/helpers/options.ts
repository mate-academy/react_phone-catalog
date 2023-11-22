export interface SortOption {
  label: string;
  value: string;
}

export const sortOptions: SortOption[] = [
  { label: 'Newest', value: 'age' },
  { label: 'Alphabetically', value: 'name' },
  { label: 'Cheapest', value: 'price' },
];

export const itemsPerPageOptions: SortOption[] = [
  { label: '4', value: '4' },
  { label: '8', value: '8' },
  { label: '16', value: '16' },
  { label: 'All', value: 'all' },
];
