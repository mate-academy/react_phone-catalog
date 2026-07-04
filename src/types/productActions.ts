import { ProductCard } from './productCard';

export type ProductCardAction = {
  type: 'HYDRATE_PRODUCTS';
  payload: ProductCard[];
};
