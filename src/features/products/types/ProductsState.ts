import { ProductInfo } from '../../../types/ProductInfo';

export type ProductsState = {
  products: ProductInfo[];
  loading: boolean;
  error: string;
  newModels: ProductInfo[];
  hotPrice: ProductInfo[];
};
