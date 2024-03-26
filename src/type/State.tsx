import { Product } from './Product';

export interface State {
  products: Product[];
  isShowMenu: boolean;
  hieghtFooter: number;
  hieghtHeader: number;
  loading: boolean;
  favourites: Product[];
  cart: Product[];
  errorMessage: string;
  reload: boolean;
}
