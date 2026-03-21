import { ProductDetails } from '../../../types/ProductDetails';

export type ProductState = {
  currentProduct: ProductDetails | null;
  categoryProducts: ProductDetails[];
  isLoading: boolean;
  error: string;
};
