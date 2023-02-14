import React from 'react';
import { useLocalStorage, getItemSaverFunction } from './utils';

type ChangeItemsType = (newProduct: Product) => void;

interface FavoritesContextInterface {
  favorites: Product[],
  changeFavItems: ChangeItemsType
}

interface CartContextInterface {
  cartItems: Product[],
  changeCartItems: ChangeItemsType
}

export const FavoritesContext = React.createContext<
FavoritesContextInterface
>({
  favorites: [],
  changeFavItems: () => {},
});
export const CartContext = React.createContext<
CartContextInterface
>({
  cartItems: [],
  changeCartItems: () => {},
});

export const SavedItemsProvider: React.FC = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage<Product>('cart', []);
  const [favorites, setFavorites] = useLocalStorage<Product>('favs', []);
  const changeCartItems = getItemSaverFunction(
    'cart',
    cartItems,
    setCartItems,
  );
  const changeFavItems = getItemSaverFunction(
    'favs',
    favorites,
    setFavorites,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        changeCartItems,
      }}
    >
      <FavoritesContext.Provider
        value={{
          favorites,
          changeFavItems,
        }}
      >
        {children}
      </FavoritesContext.Provider>
    </CartContext.Provider>
  );
};
