import { Product } from './Product';

export type ProductsContext = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};
