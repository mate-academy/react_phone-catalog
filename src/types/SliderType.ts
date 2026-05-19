import { Product } from './ProductType';

export type SliderType = {
  title: string;
  products: Product[];
  id: number;
  discount?: boolean;
};
