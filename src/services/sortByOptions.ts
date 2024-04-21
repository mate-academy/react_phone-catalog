import { Option } from '../types/Option';
import { SortByValues } from '../types/SortByValues';

export const sortByOptions: Option[] = [
  { name: 'Alphabetically', value: SortByValues.NAME },
  { name: 'Newest', value: SortByValues.AGE },
  { name: 'Cheapest', value: SortByValues.PRICE },
];
