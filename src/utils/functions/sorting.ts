import { Option } from '../../types/Option';
import { Product } from '../../types/Product';

export type SortOptionValue =
  | 'age'
  | 'new'
  | 'old'
  | 'alphabetically'
  | 'cheapest'
  | 'expensive';

export const sortFunctions: Record<
  SortOptionValue,
  (a: Product, b: Product) => number
> = {
  age: (a, b) => b.year - a.year,
  new: (a, b) => b.year - a.year,
  old: (a, b) => a.year - b.year,
  alphabetically: (a, b) => a.name.localeCompare(b.name),
  cheapest: (a, b) => a.price - b.price,
  expensive: (a, b) => b.price - a.price,
};

export const SortOptions: Option[] = [
  { label: 'Newest', value: 'new' },
  { label: 'Oldest', value: 'old' },
  { label: 'Alphabetically', value: 'alphabetically' },
  { label: 'Cheapest', value: 'cheapest' },
  { label: 'Expensive', value: 'expensive' },
];
