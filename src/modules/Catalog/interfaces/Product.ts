export interface Product {
  id: string;
  category: 'phones' | 'tablets' | 'accessories';
  itemId: string;
  name: string;
  fullPrice: string;
  price: string;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year?: number;
  image: string;
}
