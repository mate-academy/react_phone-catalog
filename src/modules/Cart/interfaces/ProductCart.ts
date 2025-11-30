export interface ProductCart {
  id: string;
  name: string;
  image: string;
  price: string;
  quantity: number;
  category: 'phones' | 'tablets' | 'accessories';
}
