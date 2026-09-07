import { ProdCard } from './Product';
import { SelectOptions } from './selectType';

export type PaginationContextType = {
  paginatedItems: ProdCard[];
  currentPage: number;
  itemsPerPage: SelectOptions | undefined;
  onPageChange: (page: number) => void;
  handlePaginationChange: (option: SelectOptions) => void;
  visiblePages: (string | number)[];
  getUrlWith: (page: number) => string;
  totalPageCount: number;
};
