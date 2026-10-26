import { createContext, useContext } from 'react';
import { CartAction } from 'src/reducers/cartReducer';
import {
  Accessories,
  CartProduct,
  Phone,
  Product,
  Tablet,
} from 'src/types/Types';

type ContextType = {
  toggleCart: (productName: string) => {
    isProductInCart: boolean;
    action: () => void;
  };
  cartProducts: CartProduct[];
  cartDispatch: React.Dispatch<CartAction>;
  addToCart: (name: string) => void;
  toggleFavourites: (product: Product) => void;
  favourites: Product[];
  products: Product[];
  isLoading: boolean;
  hasError: boolean;
  reload: () => void;
  productByCategory: {
    phones: Phone[];
    accessories: Accessories[];
    tablets: Tablet[];
  };
};

export const StoreContext = createContext<ContextType | null>(null);

export const useStoreContext = () => {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error('StoreContext is not available');
  }

  return context;
};
