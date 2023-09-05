import { PaginationOption } from './PaginationOption';
import { SortOption } from './SortOption';

export type Dropdown = {
  name: string,
  title: string;
  options: { [key: string]: SortOption | PaginationOption; }[];
};

export enum DropdownType {
  Sorter = 'sorter',
  Paginator = 'paginator',
}
