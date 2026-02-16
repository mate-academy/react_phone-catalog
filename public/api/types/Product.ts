export interface Product {
  id?: string | number;
  category: string;
  itemId: number;
  name?: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  image?: string;
  [key: string]: unknown;
}
