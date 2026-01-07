import React, { createContext, useState, useContext, useEffect } from 'react';
import { Product } from '../types/Product';

interface FavContextType {
  favItems: Product[];
  addToFav: (product: Product) => void;
  removeFromFav: (productId: number) => void;
}

const FavContext = createContext<FavContextType | undefined>(undefined);

export const FavProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Ładujemy z localStorage, żeby serduszka nie znikały po odświeżeniu
  const [favItems, setFavItems] = useState<Product[]>(() => {
    const saved = localStorage.getItem('favItems');

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favItems', JSON.stringify(favItems));
  }, [favItems]);

  const addToFav = (product: Product) => {
    // Dodajemy tylko jeśli jeszcze nie ma
    if (!favItems.some(item => item.id === product.id)) {
      setFavItems([...favItems, product]);
    }
  };

  const removeFromFav = (productId: number) => {
    setFavItems(favItems.filter(item => item.id !== productId));
  };

  return (
    <FavContext.Provider value={{ favItems, addToFav, removeFromFav }}>
      {children}
    </FavContext.Provider>
  );
};

export const useFav = () => {
  const context = useContext(FavContext);

  if (!context) {
    throw new Error('useFav must be used within a FavProvider');
  }

  return context;
};
