import { ProductColor } from '../components/ProductMain/ProductMain';

export type BasketProduct = {
  itemId: string;
  category: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: ProductColor;
  ram: string;
  image: string;
  quantity: number;
};
