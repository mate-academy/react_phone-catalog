import { createContext } from 'react';
import { Product } from '../../utils/types/Product';
import { Categories } from '../../utils/types/Categories';
import { ProductDetails } from '../../utils/types/ProductDetails';

type ProductsContextType = {
  products: Product[];
  phones: ProductDetails[];
  tablets: ProductDetails[];
  accessories: ProductDetails[];
  getProductDetails: (
    category: Categories,
    productId: string,
  ) => ProductDetails | undefined;
  getProductById: (id: string) => Product | undefined;
  loading: boolean;
  hasError: boolean;
};

export const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
);
