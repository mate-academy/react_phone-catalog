import { Product } from '../types/Product';

export type Context = {
  product: Product[];
  loading: boolean;
  loadingError: boolean;
};
