import { CartProps } from '../components/DeviceContext/DeviceContext';
// import { Device } from './device';
import { Product } from './product';

export type DeviceContextType = {
  // phones: Device[];
  // tablets: Device[];
  // accessories: Device[];
  // products: Product[];
  // phonesFromProducts: Product[];
  // tabletsFromProducts: Product[];
  // accessoriesFromProducts: Product[];
  // isLoading: boolean;
  // loadingError: boolean;
  // fetchData: () => Promise<void>;
  // fetchForProductsPage: () => Promise<void>;
  // fetchForProductDetailsPage: () => Promise<void>;
  addProductToCart: (newCartProduct: CartProps) => void;
  addProductToFavourites: (product: Product) => void;
  removeProductFromCart: (id: string) => void;
  removeProductFromFavourites: (id: number) => void;
  shoppingCart: CartProps[];
  favourites: Product[];
  handleIncrement: (item: CartProps) => void;
  handleDecrement: (item: CartProps) => void;
  handleClearCart: () => void;
};
