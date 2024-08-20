import React, { useEffect, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

type AppContextType = {
  favorites: string[];
  setFavorites: (v: string[]) => void;
  inCartItems: string[];
  setInCartItems: (v: string[]) => void;
  isDarkTheme: boolean;
  setIsDarkTheme: (v: boolean) => void;
};

export const AppContext = React.createContext<AppContextType>({
  favorites: [],
  setFavorites: () => {},
  inCartItems: [],
  setInCartItems: () => {},
  isDarkTheme: false,
  setIsDarkTheme: () => {},
});

const initialList = (request: string) => {
  const ourList = localStorage.getItem(request);

  if (!ourList) {
    localStorage.setItem(request, JSON.stringify([]));

    return [];
  }

  return JSON.parse(ourList);
};

export const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [inCartItems, setInCartItems] = useState(initialList('cart'));
  const [favorites, setFavorites] = useState(initialList('favorites'));
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    if (!favorites.length) {
      localStorage.removeItem('favorites');
    } else {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    if (!inCartItems.length) {
      localStorage.removeItem('cart');
    } else {
      localStorage.setItem('cart', JSON.stringify(inCartItems));
    }
  }, [favorites, inCartItems]);

  const contextValue = {
    favorites,
    setFavorites,
    inCartItems,
    setInCartItems,
    isDarkTheme,
    setIsDarkTheme,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
