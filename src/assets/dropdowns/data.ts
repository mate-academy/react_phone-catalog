import { Dropdown } from '../../types/Dropdown';
import { PaginationOption } from '../../types/PaginationOption';
import { SortOption } from '../../types/SortOption';

export const data: { paginator: Dropdown, sorter: Dropdown } = {
  paginator: {
    name: 'paginator',
    title: 'Items on page',
    options: [
      { All: PaginationOption.All },
      { 4: PaginationOption.Four },
      { 8: PaginationOption.Eight },
      { 16: PaginationOption.Sixteen },
    ],
  },

  sorter: {
    name: 'sorter',
    title: 'Sort by',
    options: [
      { Newest: SortOption.Age },
      { Alphabetically: SortOption.Name },
      { Cheapest: SortOption.Price },
    ],
  },
};
