import React, { useState } from 'react';

type FavouritesContextType = {
  favouriteGoods: Good[];
  addFavouriteGood: (good: Good) => void;
  removeFavouriteGood: (good: Good) => void;
}

export const FavouritesContext = React.createContext<FavouritesContextType> ({
  favouriteGoods: [],
  addFavouriteGood: () => {},
  removeFavouriteGood: () => {},
})

export const FavouritesContextWrapper: React.FC = ({ children }) => {
  const [favouriteGoods, setFavourites] = useState<Good[]>([])

  const addFavouriteGood = (good: Good) => {
    setFavourites([...favouriteGoods, good]);
  };

  const removeFavouriteGood = (good: Good) => {
    setFavourites(favouriteGoods.filter(favoriteGood => favoriteGood.id !== good.id));
  };

  return (
    <FavouritesContext.Provider
      value={{
      favouriteGoods,
      addFavouriteGood,
      removeFavouriteGood
      }}
    >
      {children}
    </FavouritesContext.Provider>
  )
}
