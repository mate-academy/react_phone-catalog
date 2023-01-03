import React from 'react';
import { useLocalStorage } from '../../helpers/useLocalStorage';
import { Product } from '../../types/Product';

type FavoritesContextType = {
  favoritesProducts: Product[],
  setFavoritesProducts: (newProduct: Product[]) => void
};

type CartContextType = {
  cartProducts: Product[] | [],
  setCartProducts: (newProduct: Product[]) => void
};

export const FavoritesProducts
  = React.createContext<FavoritesContextType>({
    favoritesProducts: [],
    setFavoritesProducts: () => {},
  });

export const CartProducts
= React.createContext<CartContextType>({
  cartProducts: [],
  setCartProducts: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const SaveProductsContext: React.FC<Props> = ({ children }) => {
  const [favoritesProducts, setFavoritesProducts]
    = useLocalStorage('favorites', []);

  const [cartProducts, setCartProducts] = useLocalStorage('cart', []);

  return (
    <FavoritesProducts.Provider value={{
      favoritesProducts,
      setFavoritesProducts,
    }}
    >
      <CartProducts.Provider value={{
        cartProducts,
        setCartProducts,
      }}
      >
        {children}
      </CartProducts.Provider>
    </FavoritesProducts.Provider>
  );
};
