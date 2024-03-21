export interface Product {
  id: string;
  category: 'phones' | 'tablets' | 'accessories';
  phoneId: string;
  itemId: string;
  name: string;
  fullPrice: number | null;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
}
