import React, { createContext, useContext, useState, useEffect } from 'react';

type Product = any;

interface FavouritesContextType {
  favourites: Product[];
  addToFavourites: (product: Product) => void;
  removeFromFavourites: (productId: string | number) => void;
  isFavourite: (productId: string | number) => boolean;
}

const FavouritesContext = createContext<FavouritesContextType | undefined>(
  undefined,
);

export const FavouritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favourites, setFavourites] = useState<Product[]>(() => {
    const saved = localStorage.getItem('favourites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const addToFavourites = (product: Product) => {
    setFavourites(prev => {
      const exists = prev.some(item => item.itemId === product.itemId);

      if (exists) return prev;

      return [...prev, product];
    });
  };

  const removeFromFavourites = (productId: string | number) => {
    setFavourites(prev => prev.filter(item => item.itemId !== productId));
  };

  const isFavourite = (productId: string | number) => {
    return favourites.some(item => item.itemId === productId);
  };

  return (
    <FavouritesContext.Provider
      value={{ favourites, addToFavourites, removeFromFavourites, isFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  const context = useContext(FavouritesContext);
  if (!context)
    throw new Error('useFavourites must be used within FavouritesProvider');
  return context;
};
