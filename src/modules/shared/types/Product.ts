export interface Product {
  id: string;
  age: number;
  name: string;
  price: number;
  snippet: string;
  discount: number;
  imageUrl: string;
  category: 'phones' | 'tablets' | 'accessories';
}
