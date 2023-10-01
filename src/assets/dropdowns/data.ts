import { DropdownType } from '../../types/DropdownType';

interface Dropdown {
  name: string,
  title: string;
  options: { [key: string]: string | number | null; }[];
}

export const data: Record<DropdownType, Dropdown> = {
  sorter: {
    name: 'sortBy',
    title: 'Sort by',
    options: [
      { 'No sorting': null },
      { Newest: 'age' },
      { Alphabetically: 'name' },
      { Cheapest: 'price' },
    ],
  },

  paginator: {
    name: 'onPage',
    title: 'Items on page',
    options: [
      { All: null },
      { 4: 4 },
      { 8: 8 },
      { 16: 16 },
    ],
  },
};
