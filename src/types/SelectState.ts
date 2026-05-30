import { SortPages } from './SortPages';
import { SortBy } from './SortBy';

export interface SelectsState {
  sortType: SortBy;
  pages: SortPages;
}
