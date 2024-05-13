export type Option = {
  value: string;
  label: string;
};

export const sortOptions: Option[] = [
  { value: 'age', label: 'Newest' },
  { value: 'name', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

export const itemsPerPageOptions: Option[] = [
  { value: 'all', label: 'All' },
  { value: '16', label: '16' },
  { value: '8', label: '8' },
  { value: '4', label: '4' },
];
