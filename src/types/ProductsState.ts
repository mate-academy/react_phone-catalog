import { Product } from './Product';

export interface ProductsState {
  products: Product[];
  isLoading: boolean;
  hasError: boolean;
}
