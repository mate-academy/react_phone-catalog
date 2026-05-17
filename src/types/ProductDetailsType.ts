import { Spec } from '../shared/components/ProductSpecs';
import { ProductDetails } from './Product';

export type ProductDetailsType = {
  productSpec: Spec[];
  productDetails: ProductDetails | undefined;
  isLoadingId: boolean;
  hasError: boolean;
  isInitialized: boolean;
};
