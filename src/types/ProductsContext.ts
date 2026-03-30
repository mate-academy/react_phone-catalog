import { Product } from './Product';

export interface ProductsContextType {
  products: Product[];
  isLoading: boolean;
  hasError: boolean;
  reload: () => void;
}
