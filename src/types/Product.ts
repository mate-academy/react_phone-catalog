export interface Product {
  id: number;
  itemId: string;
  name: string;
  category: 'phones' | 'tablets' | 'accessories';
  capacity: string;
  fullPrice: number;
  price: number;
  priceDiscount: number;
  color: string;
  image: string;
  screen: string;
  ram: string;
  year: number;
  quantity: number;
  addToCart: boolean;
}
