/* src/context/FavContext.tsx */
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Product } from '../types/Product';

// Definiujemy, co nasz "mózg ulubionych" udostępnia aplikacji
interface FavContextType {
  favItems: Product[];
  // Funkcja, która dodaje lub usuwa produkt (w zależności czy już tam jest)
  toggleFav: (product: Product) => void;
  // Funkcja do szybkiego sprawdzania, czy serduszko ma być czerwone
  isInFav: (productId: string | number) => boolean;
  // Gotowa liczba do wyświetlenia w Headerze
  favoritesCount: number;
}

const FavContext = createContext<FavContextType | undefined>(undefined);

export const FavProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Stan ulubionych z odczytem z localStorage
  const [favItems, setFavItems] = useState<Product[]>(() => {
    const saved = localStorage.getItem('favItems');

    return saved ? JSON.parse(saved) : [];
  });

  // Zapis do localStorage przy każdej zmianie listy
  useEffect(() => {
    localStorage.setItem('favItems', JSON.stringify(favItems));
  }, [favItems]);

  // Uniwersalna funkcja: jeśli jest - usuń, jeśli nie ma - dodaj
  const toggleFav = (product: Product) => {
    setFavItems(prevItems => {
      const isAlreadyFav = prevItems.some(item => item.id === product.id);

      if (isAlreadyFav) {
        return prevItems.filter(item => item.id !== product.id);
      }

      return [...prevItems, product];
    });
  };

  const isInFav = (productId: string | number) =>
    favItems.some(item => item.id === productId);

  const favoritesCount = favItems.length;

  return (
    <FavContext.Provider
      value={{ favItems, toggleFav, isInFav, favoritesCount }}
    >
      {children}
    </FavContext.Provider>
  );
};

// Hook ułatwiający korzystanie z ulubionych w komponentach
export const useFav = () => {
  const context = useContext(FavContext);

  if (!context) {
    throw new Error('useFav must be used within a FavProvider');
  }

  return context;
};
