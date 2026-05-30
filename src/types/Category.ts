import { Product } from './Product';

export type Category = {
  id: string;
  title: string;
  image: string;
  products: Product[];
  productsCount: number;
};
