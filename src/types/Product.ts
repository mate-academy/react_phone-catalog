export type ProductCategory = 'phones' | 'tablets' | 'accessories';
export interface Product {
  id: string;
  category: ProductCategory;
  itemId: string;
  name: string;

  price: number;
  fullPrice: number;

  screen: string;
  capacity: string;
  color: string;
  ram: string;

  year: number;
  image: string;
}
