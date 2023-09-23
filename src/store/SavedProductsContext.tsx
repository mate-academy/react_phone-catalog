import React from 'react';
import { Product } from '../types/Product';
import { getItemSaverFunction, useLocalStorage } from '../helpers/utils';

type FavouritesContextType = {
  favourites: Product[];
  changeFavItems: (v: Product) => void;
};

type CartContextType = {
  cartItems: Product[];
  changeCartItems: (v: Product) => void;
};

export const FavouritesContext = React.createContext<FavouritesContextType>({
  favourites: [],
  changeFavItems: () => { },
});

export const CartContext = React.createContext<CartContextType>({
  cartItems: [],
  changeCartItems: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const SavedItemsProvoder: React.FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage<Product>('cart', []);
  const [favourites, setFavourites] = useLocalStorage<Product>('favs', []);
  const changeCartItems = getItemSaverFunction(
    'cart',
    cartItems,
    setCartItems,
  );
  const changeFavItems = getItemSaverFunction(
    'favs',
    favourites,
    setFavourites,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        changeCartItems,
      }}
    >
      <FavouritesContext.Provider
        value={{
          favourites,
          changeFavItems,
        }}
      >
        {children}
      </FavouritesContext.Provider>
    </CartContext.Provider>
  );
};
