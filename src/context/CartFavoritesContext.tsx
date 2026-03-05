import { createContext, useContext, type ReactNode } from 'react';
import { useCartAndFavorites } from '@/hooks/useCartAndFavourites';

type CartFavoritesContextType = ReturnType<typeof useCartAndFavorites>;

const CartFavoritesContext = createContext<CartFavoritesContextType | null>(
  null,
);

export const CartFavoritesProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const value = useCartAndFavorites();

  return (
    <CartFavoritesContext.Provider value={value}>
      {children}
    </CartFavoritesContext.Provider>
  );
};

export const useCartFavorites = () => {
  const context = useContext(CartFavoritesContext);

  if (!context) {
    throw new Error(
      'useCartFavorites must be used within CartFavoritesProvider',
    );
  }

  return context;
};
