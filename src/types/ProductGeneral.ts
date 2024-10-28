export type ProductCategory = 'phones' | 'accessories' | 'tablets';

export interface ProductGeneral {
  id: number | string;
  category: ProductCategory;
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
