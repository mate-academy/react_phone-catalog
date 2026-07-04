export type ProductCardItem = {
  id: string;
  name: string;
  price: number;
  discount: number;
  image: string;
  category: 'phones' | 'tablets' | 'accessories';

  screen: string;
  capacity: string;
  ram: string;

  year: number;
};
