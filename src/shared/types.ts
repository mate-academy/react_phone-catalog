export type Product = {
  id: number;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
};

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  // page: number;
  // size: number | 'all';
  totalPages: number;
}

export interface Breadcrumb {
  name: string;
  to?: string;
}
