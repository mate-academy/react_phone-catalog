export type TOptions = {
  value: string | number;
  label: string;
};

export const SORT_OPTIONS: TOptions[] = [
  { value: 'year', label: 'Newest' },
  { value: 'name', label: 'Alphabetically' },
  { value: 'fullPrice', label: 'Expensive' },
  { value: 'smallPrice', label: 'Cheapest' },
  { value: 'price', label: 'Discount' },
  { value: 'screen', label: 'Screen' },
  { value: 'capacity', label: 'Capacity' },
  { value: 'ram', label: 'RAM' },
];
