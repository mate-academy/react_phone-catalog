import React, { createContext, useState } from 'react';

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
export const AddAndFavouritesContext = createContext<AddAndFavouritesContextType>({
  favourites: [],
  toggleFavourite: () => {},
  isFavourite: () => false,
  cart: [],
  toggleCart: () => {},
  isInCart: () => false,
});

// Провайдер контекста
export const AddAndFavouritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favourites, setFavourites] = useState<ID[]>([]);
  const [cart, setCart] = useState<ID[]>([]);

  // Универсальная функция toggle для любого массива
  const toggleItemInArray = (id: ID, setArray: React.Dispatch<React.SetStateAction<ID[]>>) => {
    setArray(prev => prev.includes(id) ? prev.filter(elId => elId !== id) : [...prev, id]);
  };

  // Функции для работы с favourites
  const toggleFavourite = (id: ID) => toggleItemInArray(id, setFavourites);
  const isFavourite = (id: ID) => favourites.includes(id);

  // Функции для работы с cart
  const toggleCart = (id: ID) => toggleItemInArray(id, setCart);
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
