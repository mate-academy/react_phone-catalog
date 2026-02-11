export interface Product {
  id?: string | number;
  category: string;
  itemId: number;
  name?: string;
  fullPrice: number;
  price: number;
  image?: string;
  [key: string]: unknown;
}
