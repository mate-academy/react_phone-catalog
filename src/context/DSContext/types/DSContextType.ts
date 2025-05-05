import { PerPage } from '../../../modules/Categories/Products/enums/PerPage';
import { SortBy } from '../../../modules/Categories/Products/enums/SortBy';

export interface DSContextType {
  pageNumber: number;
  PAGE_PARAM: string;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  searchPageParam: string | null;

  SORT_TITLE: string;
  sortBy: string;
  searchSortParam: string | null;
  SORT_PARAM: string;
  setSortBy: (value: SortBy | '') => void;

  PER_PAGE_TITLE: string;
  perPage: string;
  searchPerPageParam: string | null;
  PER_PAGE_PARAM: string;
  setPerPage: (value: PerPage | '') => void;
}
