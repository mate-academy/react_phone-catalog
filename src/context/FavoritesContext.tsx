import React, { useEffect, useState } from 'react';
import { Phone } from '../types/Phone';

type FavoritesContextType = {
  items: Phone[];
  toggleFavorites: (item: Phone) => void;
};

export const FavoritesContext = React.createContext<FavoritesContextType>({
  items: [],
  toggleFavorites: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const FavoritesProvider: React.FC<Props> = ({ children }) => {
  const [items, setItems] = useState<Phone[]>(() => {
    const saved = localStorage.getItem('favorites');

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(items));
  }, [items]);

  const toggleFavorites = (product: Phone) => {
    if (items.some(item => item.id === product.id)) {
      setItems(currentItems => currentItems.filter(item => item.id !== product.id));
    } else {
      setItems(currentItems => {
        return [...currentItems, product];
      });
    }
  };

  return (
    <FavoritesContext.Provider value={{ items, toggleFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
