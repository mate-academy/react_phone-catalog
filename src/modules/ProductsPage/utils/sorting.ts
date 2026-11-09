import { Product } from '../../../types/Product';

export type SortType = 'age' | 'title' | 'price';

export const DEFAULT_SORT: SortType = 'age';

export const SORT_OPTIONS: { value: SortType; label: string }[] = [
  { value: 'age', label: 'Newest' },
  { value: 'title', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

const COMPARATORS: Record<SortType, (a: Product, b: Product) => number> = {
  age: (a, b) => b.year - a.year,
  title: (a, b) => a.name.localeCompare(b.name),
  price: (a, b) => a.price - b.price,
};

export function isSortType(value: string | null): value is SortType {
  return SORT_OPTIONS.some(option => option.value === value);
}

export function sortProducts(products: Product[], sort: SortType) {
  return [...products].sort(COMPARATORS[sort]);
}
