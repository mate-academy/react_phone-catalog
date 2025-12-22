import { createContext, useContext, useEffect, useState } from 'react';
import { ProductBase } from '../types/ProductBase';

interface FavouritesContextType {
  items: ProductBase[];
  toggle: (product: ProductBase) => void;
  isFavourite: (id: number) => boolean;
  count: number;
}

const FavouritesContext = createContext<FavouritesContextType | null>(null);

export const useFavourites = () => {
  const ctx = useContext(FavouritesContext);

  if (!ctx) {
    throw new Error('useFavourites must be used within FavouritesProvider');
  }

  return ctx;
};

export const FavouritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [items, setItems] = useState<ProductBase[]>(() => {
    const saved = localStorage.getItem('favourites');

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(items));
  }, [items]);

  const toggle = (product: ProductBase) => {
    setItems(prev =>
      prev.some(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product],
    );
  };

  const isFavourite = (id: number) => items.some(p => p.id === id);

  return (
    <FavouritesContext.Provider
      value={{
        items,
        toggle,
        isFavourite,
        count: items.length,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
