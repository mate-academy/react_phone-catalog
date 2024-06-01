import { Product, ProductForCart } from './types';

export interface CatalogContextType {
  allProducts: Product[];
  favouriteProducts: Product[];
  cartProducts: ProductForCart[];
  addFavourites: (newFavourite: Product) => void;
  deleteFavourites: (favouriteIdToDelete: number) => void;
  addToCart: (newCart: Product) => void;
  deleteFromCart: (cartIdToDelete: number) => void;
  setCartProducts: React.Dispatch<React.SetStateAction<ProductForCart[]>>;
  navigationHistory: string[];
  pushNavigationHistory: (path: string) => void;
  popNavigationHistory: () => void;
}
