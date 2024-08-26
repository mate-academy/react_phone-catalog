import { Product } from '../../../../entities/Product';

export interface HomePageSchema {
  hotProducts: Product[];
  hotProductsLoading: boolean;
  hotProductsError: boolean;
  newModelProducts: Product[];
  newModelProductsLoading: boolean;
  newModelProductsError: boolean;
}
