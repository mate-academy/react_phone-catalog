import React, { createContext, useContext, useEffect, useState } from 'react';
import { InitialContext } from '../types/Context';
import { Product } from '../types/Product';
import { CartItem } from '../types/CartItem';
import { getProducts } from '../services/api';

type Props = {
  children: React.ReactNode;
};

export const AppContext = createContext<InitialContext | undefined>(undefined);

export const useAppContext = (): InitialContext => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error();
  }

  return context;
};

export const ContextProvider: React.FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favourites, setFavourites] = useState<Product[]>([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    const storedFavourites = localStorage.getItem('favourites');

    if (storedCart && storedCart !== 'undefined') {
      setCart(JSON.parse(storedCart));
    }

    if (storedFavourites && storedFavourites !== 'undefined') {
      setFavourites(JSON.parse(storedFavourites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const addProductToCart = (newCartProduct: CartItem) => {
    setCart([...cart, newCartProduct]);
  };

  const addProductToFavourites = (product: Product) => {
    setFavourites([...favourites, product]);
  };

  const removeProductFromCart = (id: string) => {
    setCart(cart.filter(product => product.id !== id));
  };

  const removeProductFromFavourites = (id: number) => {
    setFavourites(favourites.filter(product => product.id !== id));
  };

  const handleIncrement = (item: CartItem) => {
    const updatedCart = cart.map(cartItem => {
      if (cartItem.id === item.id) {
        return {
          ...cartItem,
          count: cartItem.count + 1,
        };
      }

      return cartItem;
    });

    setCart(updatedCart);
  };

  const handleDecrement = (item: CartItem) => {
    const updatedCart = cart.map(cartItem => {
      if (cartItem.id === item.id && cartItem.count > 1) {
        return {
          ...cartItem,
          count: cartItem.count - 1,
        };
      }

      return cartItem;
    });

    setCart(updatedCart);
  };

  const handleClearCart = () => {
    setCart([]);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await getProducts();

        setProducts(res);
      } catch (error) {
        setIsError(true);
        // console.error('Failed to fetch products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        products,
        cart,
        favourites,
        isError,
        addProductToCart,
        addProductToFavourites,
        removeProductFromCart,
        removeProductFromFavourites,
        handleIncrement,
        handleDecrement,
        handleClearCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
