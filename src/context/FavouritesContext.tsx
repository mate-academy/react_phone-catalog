import React, { createContext, useState, useEffect } from 'react';
import { Product } from '../type/Product';

 type FavouritesItem = {
   id: number;
   product: Product;
   quantity: number;
 };

type FavouritesContextType = {
  favouritesItems: FavouritesItem[];
  addToFavourites: (item: FavouritesItem) => void;
  removeFromFavourites: (item: FavouritesItem) => void;
  isItemInFavourites: (productId: number) => boolean;
  toggleFavourite: (product: Product) => void;
};

export const FavouritesContext = createContext<FavouritesContextType>({
  favouritesItems: [],
  addToFavourites: () => {},
  removeFromFavourites: () => {},
  isItemInFavourites: () => false,
  toggleFavourite: () => {},
});

export const FavouritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favouritesItems, setFavouritesItems] = useState<FavouritesItem[]>(
    localStorage.getItem('favouritesItems')
      ? JSON.parse(localStorage.getItem('favouritesItems') as string)
      : [],
  );

  const addToFavourites = (item: FavouritesItem) => {
    const isItemInFavourites = favouritesItems.find((favItem) => favItem.id === item.id);

    if (!isItemInFavourites) {
      setFavouritesItems([...favouritesItems, item]);
    }
  };

  const removeFromFavourites = (item: FavouritesItem) => {
    const updatedFavourites = favouritesItems.filter((favItem) => favItem.id !== item.id);

    setFavouritesItems(updatedFavourites);
  };

  const isItemInFavourites = (productId: number) => {
    return favouritesItems.some((favItem) => favItem.id === productId);
  };

  const toggleFavourite = (product: Product) => {
    const itemId = +product.id;
    const isItemInFavourites = favouritesItems.find((favItem) => favItem.id === itemId);

    if (isItemInFavourites) {
      removeFromFavourites(isItemInFavourites);
    } else {
      addToFavourites({ id: itemId, product, quantity: 1 });
    }
  };

  useEffect(() => {
    localStorage.setItem('favouritesItems', JSON.stringify(favouritesItems));
  }, [favouritesItems]);

  const contextValue: FavouritesContextType = {
    favouritesItems,
    addToFavourites,
    removeFromFavourites,
    isItemInFavourites,
    toggleFavourite,
  };

  return (
    <FavouritesContext.Provider value={contextValue}>
      {children}
    </FavouritesContext.Provider>
  );
};
