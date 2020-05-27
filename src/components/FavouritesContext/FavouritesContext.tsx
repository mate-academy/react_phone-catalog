import React, { useState } from 'react';

type FavouritesContextType = {
  favouriteGoods: Good[];
  addFavouriteGood: (good: Good) => void;
  removeFavouriteGood: (good: Good) => void;
  isFavourite: (good: Good) => boolean;
}

export const FavouritesContext = React.createContext<FavouritesContextType> ({
  favouriteGoods: [],
  addFavouriteGood: () => {},
  removeFavouriteGood: () => {},
  isFavourite: () => false,
})

export const FavouritesContextWrapper: React.FC = ({ children }) => {
  const [favouriteGoods, setFavourites] = useState<Good[]>([])

  const addFavouriteGood = (good: Good) => {
    setFavourites([...favouriteGoods, good]);
  };

  const removeFavouriteGood = (good: Good) => {
    setFavourites(favouriteGoods.filter(favoriteGood => favoriteGood.id !== good.id));
  };

  const isFavourite = (good: Good) => {
    return favouriteGoods.some(favoriteGood => favoriteGood.id === good.id);
  };

  return (
    <FavouritesContext.Provider
      value={{
        favouriteGoods,
        addFavouriteGood,
        removeFavouriteGood,
        isFavourite,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  )
}
