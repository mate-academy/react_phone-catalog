import { SetURLSearchParams } from 'react-router-dom';
import { ProdCard, Product } from './Product';
import { SearchParams } from '../utils/helpers/searchHelper';
import { SelectOptions } from './selectType';

export enum SortField {
  Newest = 'Newest',
  Alphabetically = 'Alphabetically',
  Cheapest = 'Cheapest',
}

export type FiltersContextType = {
  setSearchWith: (params: SearchParams) => void;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  sortedProduct: Product[];
  sort: SortField | null;
  getProductsByCategory: (category: string) => Product[];
  currentProducts: Product[];
  productCard: ProdCard[];
  value: SelectOptions | undefined;
  handleSelectChange: (option: SelectOptions) => void;
};
