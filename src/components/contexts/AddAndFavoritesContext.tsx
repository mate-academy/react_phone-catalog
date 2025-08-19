import React, { createContext } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

// Тип для ID товара
type ID = number;

// Тип для данных в контексте
type AddAndFavoritesContextType = {
  // Избранные
  favorites: ID[];
  toggleFavorite: (id: ID) => void;
  isFavorite: (id: ID) => boolean;

  // Добавленные в корзину
  cart: ID[];
  toggleCart: (id: ID) => void;
  isInCart: (id: ID) => boolean;
};

// Создаём контекст с дефолтными значениями
export const AddAndFavoritesContext =
  createContext<AddAndFavoritesContextType>({
    favorites: [],
    cart: [],

    toggleFavorite: () => {},
    toggleCart: () => {},

    isFavorite: () => false,
    isInCart: () => false,
  });

// Провайдер контекста
export const AddAndFavoritesProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [favorites, setFavorites] = useLocalStorage<ID[]>('favorites', []);
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

  // Функции для работы с favorites
  const toggleFavorite = (id: ID) => toggleItemInArray(id, favorites, setFavorites);
  const isFavorite = (id: ID) => favorites.includes(id);

  // Функции для работы с cart
  const toggleCart = (id: ID) => toggleItemInArray(id, cart, setCart);
  const isInCart = (id: ID) => cart.includes(id);

  return (
    <AddAndFavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        cart,
        toggleCart,
        isInCart,
      }}
    >
      {children}
    </AddAndFavoritesContext.Provider>
  );
};
