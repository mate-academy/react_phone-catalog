import React, {
  useEffect,
  useReducer,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import * as ProductApi from '../../api/products';
import {
  Product,
} from '../../types/Product';
import favoritesReducer, {
  FavoritesItem,
  actions as favoritesActions,
} from '../../features/favorites';
import cartReducer, {
  CartItem,
  actions as cartActions,
} from '../../features/cart';

type Props = {
  children: React.ReactNode;
};

type AppContextType = {
  isLoading: boolean,
  products: Product[],
  cart: CartItem[],
  favorites: FavoritesItem[],
  addToCart: (productId: Product['itemId']) => void,
  takeFromCart: (productId: Product['itemId']) => void,
  removeFromCart: (productId: Product['itemId']) => void,
  addToFavorites: (productId: Product['itemId']) => void,
  takeFromFavorites: (productId: Product['itemId']) => void,
};

export const AppContext = React.createContext<AppContextType>({
  isLoading: false,
  products: [],
  cart: [],
  favorites: [],
  addToCart: () => { },
  takeFromCart: () => { },
  removeFromCart: () => { },
  addToFavorites: () => { },
  takeFromFavorites: () => { },
});

const CART_STORAGE_KEY = 'cartStorage';
const FAVORITES_STORAGE_KEY = 'favoritesStorage';

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, cartDispatch] = useReducer(
    cartReducer, [],
    (initVal) => {
      const store = localStorage.getItem(CART_STORAGE_KEY);

      return store ? JSON.parse(store) : initVal;
    },
  );
  const [favorites, favoritesDispatch] = useReducer(
    favoritesReducer, [],
    (initVal) => {
      const store = localStorage.getItem(FAVORITES_STORAGE_KEY);

      return store ? JSON.parse(store) : initVal;
    },
  );
  const navigate = useNavigate();

  function cartFn(actionKey: keyof (typeof cartActions)) {
    return (productId: Product['itemId']) => {
      const product = products.find(item => item.itemId === productId);

      if (product) {
        cartDispatch(cartActions[actionKey](product));
      }
    };
  }

  function favoritesFn(actionKey: keyof (typeof favoritesActions)) {
    return (productId: Product['itemId']) => {
      const product = products.find(item => item.itemId === productId);

      if (product) {
        favoritesDispatch(favoritesActions[actionKey](product));
      }
    };
  }

  useEffect(() => {
    console.info('AppProvider->useEffect->FavoritesLocalStorage');// eslint-disable-line
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    console.info('AppProvider->useEffect->CartLocalStorage');// eslint-disable-line
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    setIsLoading(true);
    console.info('AppProvider->useEffect->Loading');// eslint-disable-line

    ProductApi.getProducts()
      .then(setProducts)
      .catch(() => {
        navigate('/error', {
          state: { errorMsg: 'Error at the loading time' },
          replace: true,
        });
      })
      .finally(() => setIsLoading(false));
  }, []);

  const value = ({
    isLoading,
    products,
    cart,
    favorites,
    addToCart: cartFn('add'),
    takeFromCart: cartFn('take'),
    removeFromCart: cartFn('remove'),
    addToFavorites: favoritesFn('add'),
    takeFromFavorites: favoritesFn('take'),
  });

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
