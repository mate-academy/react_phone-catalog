import { createContext, useState, useContext, useEffect } from 'react';
import { Product } from '../types/Product';

interface FavoritesContextType {
  items: Product[];
  toggleFavorite: (product: Product) => void;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [items, setItems] = useState<Product[]>(() => {
    const saved = localStorage.getItem('favorites');

    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorite = (product: Product) => {
    const alreadyInFavorites = items.some(
      item => item.itemId === product.itemId,
    );

    if (alreadyInFavorites) {
      setItems(items.filter(item => item.itemId !== product.itemId));
    } else {
      setItems([...items, product]);
    }
  };

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(items));
  }, [items]);

  return (
    <FavoritesContext.Provider value={{ items, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  return context;
};
