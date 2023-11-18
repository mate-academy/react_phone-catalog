import { Product } from './Product';

export type GlobalContextType = {
  products: Product[],
  hasError: string,
  setHasError: React.Dispatch<React.SetStateAction<string>>,
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
  localStore: Product[],
  setLocalStore: (v: Product[]) => void,
  handleChooseCart: (card: Product, action: string) => void;
};
