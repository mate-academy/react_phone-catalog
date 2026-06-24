export interface Product {
  id: number;
  category: ProductType;
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

export type ProductType = 'phones' | 'tablets' | 'accessories';
