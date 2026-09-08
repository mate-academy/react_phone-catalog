import { Product } from './Product';
import { ProductsCategory } from './ProductsCategory';

export type ProductsContextValue = {
  sortedProduct: Product[];
  products: Product[];
  isLoading: boolean;
  isError: boolean;
  setIsLoading: (value: boolean) => void;
  loadProducts: (productsCategory: ProductsCategory) => void;
};

export interface CartItem {
  product: Product;
  quantity: number;
}

export type CartState = CartItem[];

export type CartContextValue = {
  cart: CartState;
  cartCount: number;
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  increaseQuantity: (product: Product) => void;
  decreaseQuantity: (product: Product) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
};

export interface FavouriteItem {
  product: Product;
}

export type FavouriteState = FavouriteItem[];

export type FavouriteContextValue = {
  favourites: FavouriteState;
  favouritesCount: number;
  addToFavourite: (product: Product) => void;
  removeFromFavourite: (product: Product) => void;
};
