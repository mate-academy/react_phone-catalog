import { ProductColor } from '../components/ProductMain/ProductMain';

export type FavoriteProduct = {
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
};
