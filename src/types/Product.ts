export interface Product {
  id: number;
  name: string;
  itemId: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  ram: string;
  year: number;
  image: string;
  images: string[];
  category: 'phones' | 'tablets' | 'accessories';
}
