import { ProductDetails } from './ProductDetails';

export interface ProductDetailsState {
  product: ProductDetails | null;
  isLoading: boolean;
  hasError: boolean;
}
