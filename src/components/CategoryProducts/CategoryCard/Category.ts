import { Product } from '../../../types/Product';

export type Category = {
  path: string;
  category: Product['category'];
  title: string;
  src: string;
  background: string;
};
