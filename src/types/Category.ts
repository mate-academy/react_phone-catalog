export type SortType = 'age' | 'price' | 'title';
export type SortOrder = 'asc' | 'desc';

export interface SortOption {
  label: string;
  sortType: SortType;
  order: SortOrder;
}

export interface CategoryConfig {
  title: string;
  breadcrumb: string;
  category: 'phones' | 'tablets' | 'accessories';
  sortOptions: SortOption[];
}
