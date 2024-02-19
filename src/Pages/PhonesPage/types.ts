import { Item } from '../../types/interface/Item';

export interface PhonesPageProps {
  items: Item[],
}

export interface PhonesPageViewProps {
  totalItems: number,
  itemsOnPage: number,
  changeItemsPerPage: (option: string)=>void,
  currentItems: Item[],
  currentPage: number,
  setCurrentPage: (page: number) => void,
  sortItems: (option: string)=>void,
}
