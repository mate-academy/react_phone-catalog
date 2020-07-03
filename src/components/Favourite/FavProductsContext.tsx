import React, { useState } from 'react';

type FavouriteType = {
  favourites: ProductItem[];
  addToFav: (item: ProductItem) => void;
  removeFav: (item: ProductItem) => void;
  isFavourite: (item: ProductItem) => boolean;
};

export const FavProductsContext = React.createContext<FavouriteType>({
  favourites: [],
  addToFav: () => {},
  removeFav: () => {},
  isFavourite: () => false,
});

export const FavContextWrap: React.FC = ({ children }) => {
  const [favourites, setFavourites] = useState<ProductItem[]>([]);

  const addToFav = (item: ProductItem) => {
    setFavourites([...favourites, item]);
  };

  const removeFav = (item: ProductItem) => {
    setFavourites(favourites.filter(product => product.id !== item.id));
  };

  const isFavourite = (item: ProductItem) => {
    return favourites.some(favourite => favourite.id === item.id);
  };

  return (
    <FavProductsContext.Provider value={{
      favourites, addToFav, removeFav, isFavourite,
    }}
    >
      {children}
    </FavProductsContext.Provider>
  );
};
