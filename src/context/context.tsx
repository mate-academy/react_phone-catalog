import {
  createContext, ReactNode, useContext, useEffect, useState,
} from 'react';
import { Product } from '../helpers/Types';
import { fetchData } from '../helpers/Api';

interface MyContextProps {
  products: Product[];
  favourites: Product[];
  cart: Product[];
  toggleToFavourites: (id: string) => void;
  toggleToCart: (id: string) => void;
  isInFavourites: (id: string) => boolean;
  isInCart: (id: string) => boolean;
}

const MyContext = createContext<MyContextProps | undefined>(undefined);

interface MyContextProviderProps {
  children: ReactNode;
}

export const useMyContext = () => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }

  return context;
};

export const MyContextProvider: React.FC<MyContextProviderProps>
= ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [favourites, setFavourites] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const fetchDataFromJson = async () => {
      const jsonData = await fetchData();

      setProducts(() => jsonData);
    };

    fetchDataFromJson();
  }, []);

  const toggleToFavourites = (itemId: string) => {
    const indexInFavourites = favourites.findIndex((item) => (
      item.id === itemId));

    if (indexInFavourites === -1) {
      const product = products.find((item) => item.id === itemId);

      if (product) {
        setFavourites((prev) => [...prev, product]);
      }
    } else {
      setFavourites((prev) => prev.filter((product) => (
        product.id !== itemId)));
    }
  };

  const toggleToCart = (itemId: string) => {
    const indexInCart = cart.findIndex((item) => (
      item.id === itemId));

    if (indexInCart === -1) {
      const product = products.find((item) => item.id === itemId);

      if (product) {
        setCart((prev) => [...prev, product]);
      }
    } else {
      setCart((prev) => prev.filter((product) => (
        product.id !== itemId)));
    }
  };

  const isInFavourites = (itemId: string): boolean => (
    favourites.findIndex((item) => item.id === itemId) !== -1);

  const isInCart = (itemId: string): boolean => (
    cart.findIndex((item) => item.id === itemId) !== -1);

  return (
    <MyContext.Provider value={{
      products,
      favourites,
      cart,
      toggleToFavourites,
      toggleToCart,
      isInFavourites,
      isInCart,
    }}
    >
      {children}
    </MyContext.Provider>
  );
};
