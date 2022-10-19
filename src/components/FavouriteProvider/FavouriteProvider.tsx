import React, { useEffect, useMemo, useState } from 'react';

export const FavouriteContext = React.createContext<FavouriteContextType>(
  {
    favourites: [],
    setFavourites: () => {},
    isFavouriteToggle: () => {},
  },
);

export const FavouriteProvider: React.FC = ({ children }) => {
  const [favourites, setFavourites] = useState<Product[]>(
    JSON.parse(localStorage.getItem('favourites') || '[]'),
  );

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const isFavouriteToggle = (product: Product) => {
    const isFavourite = favourites.some(
      favouritesItem => favouritesItem.id === product.id,
    );

    if (isFavourite) {
      setFavourites(favourites.filter(
        favouritesItem => favouritesItem.id !== product.id,
      ));
    } else {
      setFavourites([...favourites, product]);
    }
  };

  const contextValue: FavouriteContextType = useMemo(() => {
    return {
      favourites,
      setFavourites,
      isFavouriteToggle,
    };
  }, [favourites]);

  return (
    <FavouriteContext.Provider value={contextValue}>
      {children}
    </FavouriteContext.Provider>
  );
};
