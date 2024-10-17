export type TOptions = {
  value: string | number;
  label: string;
};

export const SORT_OPTIONS: TOptions[] = [
  { value: 'year', label: 'Newest' },
  { value: 'fullPrice', label: 'Expensive' },
  { value: 'price', label: 'Discount' },
  { value: 'screen', label: 'Screen' },
  { value: 'capacity', label: 'Capacity' },
  { value: 'ram', label: 'RAM' },
];

export const ITEMS_ON_PAGE: TOptions[] = [
  { value: 64, label: '64' },
  { value: 32, label: '32' },
  { value: 16, label: '16' },
  { value: 8, label: '8' },
];
