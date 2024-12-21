import { ProductDetailsType } from '../../../types/ProductDetailsType';

export interface ProductDetailsState {
  loading: boolean;
  product: ProductDetailsType | null;
  error: string;
}
