import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
} from 'react';
import { ReactNode, useState } from 'react';
import { Product } from '../types/Product';
import { Cart } from '../types/Cart';
import { getAllProducts } from '../utils/api';

type GlobalContextType = {
  allProducts: Product[];
  setAllProducts: Dispatch<SetStateAction<Product[]>>;
  cart: Cart[];
  setCart: Dispatch<SetStateAction<Cart[]>>;
  favorites: Product[];
  setFavorites: Dispatch<SetStateAction<Product[]>>;
  addToCart: (product: Product) => void;
  toggleFavorites: (product: Product) => void;
};

export const GlobalContext = createContext<GlobalContextType>({
  allProducts: [] as Product[],
  setAllProducts: () => {},
  cart: [] as Cart[],
  setCart: () => {},
  favorites: [] as Product[],
  setFavorites: () => {},
  addToCart: () => {},
  toggleFavorites: () => {},
});

type Props = {
  children: ReactNode;
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Cart[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    getAllProducts().then(productsFronServer =>
      setAllProducts(productsFronServer),
    );
  }, []);

  const addToCart = (product: Product) => {
    if (product) {
      const isProductInCart = cart.some(
        cartItem => cartItem.product.itemId === product.itemId,
      );

      if (!isProductInCart) {
        const newCart = {
          id: product.itemId,
          product: product,
          quantity: 1,
        };

        setCart(prev => [...prev, newCart]);
      }
    }
  };

  const toggleFavorites = (product: Product) => {
    if (product) {
      const isProductInFavorites = favorites.some(
        fav => fav.itemId === product.itemId,
      );

      setFavorites(prev => {
        if (!isProductInFavorites) {
          return [...prev, product];
        } else {
          return prev.filter(item => item.itemId !== product.itemId);
        }
      });
    }
  };

  console.log(favorites);

  const data = useMemo(
    () => ({
      allProducts,
      setAllProducts,
      cart,
      setCart,
      favorites,
      setFavorites,
      addToCart,
      toggleFavorites,
    }),
    [
      allProducts,
      setAllProducts,
      cart,
      setCart,
      favorites,
      setFavorites,
      addToCart,
      toggleFavorites,
    ],
  );

  return (
    <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
  );
};
