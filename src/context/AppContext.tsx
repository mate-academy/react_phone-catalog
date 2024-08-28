import React, { createContext, useCallback, useContext } from 'react';
import { Product } from '../types/Product';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { CartItemProps } from '../types/CartItemProps';

type Props = {
  children: React.ReactNode;
};

type AppContextType = {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  cart: CartItemProps[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  calculateTotalPrice: () => number;
  clearCart: () => void;
};

const AppContext = createContext<AppContextType>({
  favorites: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartQuantity: () => {},
  calculateTotalPrice: () => 0,
  clearCart: () => {},
});

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [favorites, setFavorites] = useLocalStorage<Product[]>('favorites', []);
  const [cart, setCart] = useLocalStorage<CartItemProps[]>('cart', []);

  const addToFavorites = useCallback(
    (product: Product) => {
      setFavorites((prevFavorites: Product[]) => [...prevFavorites, product]);
    },
    [setFavorites],
  );

  const removeFromFavorites = useCallback(
    (productId: string) => {
      setFavorites((prevFavorites: Product[]) =>
        prevFavorites.filter(product => product.id !== productId),
      );
    },
    [setFavorites],
  );

  const addToCart = useCallback(
    (product: Product) => {
      setCart(prevCart => [...prevCart, { product, quantity: 1 }]);
    },
    [setCart],
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      setCart((prevCart: CartItemProps[]) =>
        prevCart.filter(item => item.product.id !== productId),
      );
    },
    [setCart],
  );

  const updateCartQuantity = useCallback(
    (productId: string, delta: number) => {
      setCart(currentCart =>
        currentCart.map(cartItem => {
          if (cartItem.product.id === productId) {
            const newQuantity = Math.max(cartItem.quantity + delta, 1);

            return { ...cartItem, quantity: newQuantity };
          }

          return cartItem;
        }),
      );
    },
    [setCart],
  );

  const clearCart = useCallback(() => {
    setCart([]);
  }, [setCart]);

  const calculateTotalPrice = useCallback(() => {
    return Math.floor(
      cart.reduce(
        (total, { product, quantity }) => total + product.price * quantity,
        0,
      ),
    );
  }, [cart]);

  return (
    <AppContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        calculateTotalPrice,
        clearCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
