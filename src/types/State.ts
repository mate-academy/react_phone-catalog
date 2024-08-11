import { Details } from './Details';
import { Product } from './Product';

export type State = {
  isMenuOpen: boolean;
  products: Product[];
  brandNewModels: Product[];
  hotPrices: Product[];
  phones: Product[];
  tablets: Product[];
  accessories: Product[];
  favourites: Product[];
  cart: Product[];
  selectedProduct: Details | null;
  isLoading: boolean;
};
