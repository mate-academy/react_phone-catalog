import { TProduct } from './product.type';

export interface IPagination {
  currentProducts: TProduct[];
  currentPage: number;
  itemPerPage: number;
  isVisible: boolean;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setItemPerPage: React.Dispatch<React.SetStateAction<number>>;
  handlePageChange: (delta: number) => void;
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
}
