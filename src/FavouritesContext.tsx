import React, { useEffect, useState } from 'react';
import { Product } from './types/Product';

type Props = {
  children: React.ReactNode;
};

type FavouritesContextType = {
  favItems: Product[];
  addItem: (product: Product) => void;
  deleteItem: (id: string) => void;
};

export const FavouritesContext =
  React.createContext<FavouritesContextType | null>(null);

export const FavouritesProvider: React.FC<Props> = ({ children }) => {
  const [favouriteItems, setFavouriteItems] = useState<Product[]>(() => {
    const saved = localStorage.getItem('favourites');

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favouriteItems));
  }, [favouriteItems]);

  return (
    <FavouritesContext.Provider
      value={{
        favItems: favouriteItems,
        addItem: product => {
          setFavouriteItems(prev => {
            if (prev.some(item => item.itemId === product.itemId)) {
              return prev;
            } else {
              return [...prev, product];
            }
          });
        },
        deleteItem: id => {
          setFavouriteItems(prev => {
            return [...prev].filter(el => el.itemId !== id);
          });
        },
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
