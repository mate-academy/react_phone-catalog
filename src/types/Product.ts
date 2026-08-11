export interface Product {
  id: string;
  category: 'phones' | 'tablets' | 'accessories';
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
}

export type SortOption = 'age' | 'name' | 'price';

export type CategoryType = 'phones' | 'tablets' | 'accessories';
