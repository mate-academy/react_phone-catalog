import React from 'react';
import { useLocalStorage } from '../hooks/storage';

type AppContextValue = {
  cartIds: string[];
  addToCart: (id: string) => void;
  deleteFromCart: (id: string) => void;
  wishlistIds: string[];
  toggleWishlist: (id: string) => void;
};

export const AppContext = React.createContext<AppContextValue | undefined>(
  undefined,
);

type Props = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [cartIds, setCardIds] = useLocalStorage<string[]>('cart', []);

  const [wishlistIds, setWishlistIds] = useLocalStorage<string[]>(
    'favorites',
    [],
  );

  const addToCart = (cartId: string) => {
    setCardIds([...cartIds, cartId]);
  };

  const deleteFromCart = (cartId: string) => {
    setCardIds((prevValue: string[]) => prevValue.filter(id => id !== cartId));
  };

  const toggleWishlist = (wishId: string) => {
    if (wishlistIds.includes(wishId)) {
      setWishlistIds((prevValue: string[]) =>
        prevValue.filter(id => id !== wishId),
      );
    } else {
      return setWishlistIds([...wishlistIds, wishId]);
    }
  };

  return (
    <AppContext.Provider
      value={{
        cartIds,
        addToCart,
        deleteFromCart,
        wishlistIds,
        toggleWishlist,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
