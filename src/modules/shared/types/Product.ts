export interface Product {
  id: string;
  name: string;
  price: number;
  fullPrice: number;
  image: string;
  screen: string;
  capacity: string;
  ram: string;
  age: number;
  category: 'phones' | 'tablets' | 'accessories';
}
