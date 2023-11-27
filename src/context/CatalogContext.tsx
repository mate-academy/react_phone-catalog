import {
  createContext,
  Dispatch,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { getAllProducts } from '../api/products';
import { CartAction, FavoritesAction } from '../enums/enums';
import { CartActionType, cartReducer } from '../reducers/cartReducer';
import {
  FavoritesActionType,
  favoritesReducer,
} from '../reducers/favoriteReducer';
import { CartItemType } from '../types/CartItemType';

import { Product } from '../types/Product';

export const CatalogContext = createContext<{
  products: Product[],
  favorites: Product[],
  cart: CartItemType[],
  dispatchCart: Dispatch<CartActionType>;
  dispatchFavorites: Dispatch<FavoritesActionType>;
}>({
  products: [],
  favorites: [],
  cart: [],
  dispatchCart: () => null,
  dispatchFavorites: () => null,
});

interface CatalogProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const CatalogProvider = ({ children }: CatalogProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [{ favorites }, dispatchFavorites] = useReducer(favoritesReducer,
    { favorites: [] });
  const [{ cart }, dispatchCart] = useReducer(cartReducer, { cart: [] });

  const loadProducts = async () => {
    try {
      const data = await getAllProducts();

      setProducts(data);
    } catch {
      throw new Error('Unable to load products!');
    }
  };

  const loadReducers = () => {
    dispatchCart({ type: CartAction.LOAD });
    dispatchFavorites({ type: FavoritesAction.LOAD });
  };

  useEffect(() => {
    loadProducts();
    loadReducers();
  }, []);

  return (
    <CatalogContext.Provider value={{
      products,
      favorites,
      cart,
      dispatchFavorites,
      dispatchCart,
    }}
    >
      {children}
    </CatalogContext.Provider>
  );
};
