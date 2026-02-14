import { SearchParams } from './SearchParams';

export interface SearchContextType {
  searchParams: URLSearchParams;
  getSearchWith: (paramsToUpdate: SearchParams) => string;
  setSearchParams: (value: URLSearchParams) => void;
  transformToSearchValue: (value: string) => string;
}
