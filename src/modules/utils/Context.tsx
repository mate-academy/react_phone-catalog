import React from 'react';
import { useLocalStorage } from '../hooks/use-storage';

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
    if (!cartIds.includes(cartId)) {
      setCardIds([...cartIds, cartId]);
    }
  };

  const deleteFromCart = (cartId: string) => {
    const newArr = cartIds.filter(id => id !== cartId);

    setCardIds(newArr);
  };

  const toggleWishlist = (wishId: string) => {
    const newArr = wishlistIds.filter(id => id !== wishId);

    if (wishlistIds.includes(wishId)) {
      setWishlistIds(newArr);
    } else {
      setWishlistIds([...wishlistIds, wishId]);
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
