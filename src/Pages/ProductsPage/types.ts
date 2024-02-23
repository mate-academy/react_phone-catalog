import { Product } from '../../store/models/product';

export interface PhonesPageViewProps {
  totalItems: number,
  itemsOnPage: number,
  changeItemsPerPage: (option: string)=>void,
  currentItems: Product[],
  currentPage: number,
  setCurrentPage: (page: number) => void,
  sortItems: (option: string) => void,
}
