import { ProductCagetories } from '../../../types/ProductCategories';

export interface FetchProductDetailsArgs {
  category: ProductCagetories;
  productId: string;
}
