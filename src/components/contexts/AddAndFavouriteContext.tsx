import React, { createContext } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

// Тип для ID товара
type ID = number;

// Тип для данных в контексте
type AddAndFavouritesContextType = {
  // Избранные
  favourites: ID[];
  toggleFavourite: (id: ID) => void;
  isFavourite: (id: ID) => boolean;

  // Добавленные в корзину
  cart: ID[];
  toggleCart: (id: ID) => void;
  isInCart: (id: ID) => boolean;
};

// Создаём контекст с дефолтными значениями
export const AddAndFavouritesContext =
  createContext<AddAndFavouritesContextType>({
    favourites: [],
    cart: [],

    toggleFavourite: () => {},
    toggleCart: () => {},

    isFavourite: () => false,
    isInCart: () => false,
  });

// Провайдер контекста
export const AddAndFavouritesProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [favourites, setFavourites] = useLocalStorage<ID[]>('favourites', []);
  const [cart, setCart] = useLocalStorage<ID[]>('cart', []);

  // Универсальная функция toggle для любого массива
  const toggleItemInArray = (
    id: ID,
    array: ID[],
    saveArray: (newValue: ID[]) => void,
  ) => {
    const newArray = array.includes(id)
      ? array.filter(elId => elId !== id)
      : [...array, id];

    saveArray(newArray);
  };

  // Функции для работы с favourites
  const toggleFavourite = (id: ID) => toggleItemInArray(id, favourites, setFavourites);
  const isFavourite = (id: ID) => favourites.includes(id);

  // Функции для работы с cart
  const toggleCart = (id: ID) => toggleItemInArray(id, cart, setCart);
  const isInCart = (id: ID) => cart.includes(id);

  return (
    <AddAndFavouritesContext.Provider
      value={{
        favourites,
        toggleFavourite,
        isFavourite,
        cart,
        toggleCart,
        isInCart,
      }}
    >
      {children}
    </AddAndFavouritesContext.Provider>
  );
};
