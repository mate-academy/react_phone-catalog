import { ProductCategory } from 'shared/constants/productCategory';

import { Product } from './Product';

export type ProductsByCategory = Record<ProductCategory, Product[]>;

export type ProductsContextType = {
  allProducts: Product[];
  productsByCategory: ProductsByCategory;
  loading: boolean;
  error: string | null;
};

export type FiltersContextType = {
  pageCategory: string;
  setPageCategory: (category: ProductCategory) => void;
  newModels: Product[];
  hotModels: Product[];
};
