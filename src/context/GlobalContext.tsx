import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
} from 'react';
import { ReactNode, useState } from 'react';
import { Product } from '../types/Product';
import { getAllProducts } from '../utils/api';

type GlobalContextType = {
  allProducts: Product[];
  setAllProducts: Dispatch<SetStateAction<Product[]>>;
  cart: string[];
  setCart: Dispatch<SetStateAction<string[]>>;
  addToCart: (productId: string) => void;
  favorites: string[];
  setFavorites: Dispatch<SetStateAction<string[]>>;
  toggleFavorites: (productId: string) => void;
};

export const GlobalContext = createContext<GlobalContextType>({
  allProducts: [] as Product[],
  setAllProducts: () => {},
  cart: [],
  setCart: () => {},
  addToCart: () => {},
  favorites: [],
  setFavorites: () => {},
  toggleFavorites: () => {},
});

type Props = {
  children: ReactNode;
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [cart, setCart] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    getAllProducts()
      .then(productsFronServer => setAllProducts(productsFronServer))
      .catch(() => setErrorMessage('Products are not avaliable'));
  }, []);

  const addToCart = (productId: string) => {
    if (productId) {
      const isProductInCart = cart.some(
        cartItem => cartItem === productId,
      );

      if (!isProductInCart) setCart(prev => [...prev, productId]);
    }
  };

  const toggleFavorites = (productId: string) => {
    if (productId) {
      const isProductInFavorites = favorites.some(
        fav => fav === productId,
      );

      setFavorites(prev => {
        if (!isProductInFavorites) {
          return [...prev, productId];
        } else {
          return prev.filter(item => item !== productId);
        }
      });
    }
  };

  const data = useMemo(
    () => ({
      allProducts,
      setAllProducts,
      cart,
      setCart,
      addToCart,
      favorites,
      setFavorites,
      toggleFavorites,
    }),
    [
      allProducts,
      setAllProducts,
      cart,
      setCart,
      addToCart,
      favorites,
      setFavorites,
      toggleFavorites,
    ],
  );

  return (
    <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
  );
};
