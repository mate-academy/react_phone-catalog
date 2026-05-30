/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useMemo, useState } from 'react';

import { NavLinks } from '../../../enums/NavLinks';
import { Product } from '../../../types/CategoriesTypes/Product';
import { FavouritesContext } from '../FavouritesContext';
import { Favourites } from '../types/Favourites';

interface Props {
  children: React.ReactNode;
}

export const FavouritesContextProvider: React.FC<Props> = ({ children }) => {
  const getFavourites = (): Favourites => {
    return JSON.parse(localStorage.getItem(NavLinks.favourites) || '{}');
  };

  const [favourites, setFavourites] = useState<Favourites>(getFavourites());

  // #region functions

  const addModel = (id: string, props: Product) => {
    const value = { ...favourites, [id]: props };

    setFavourites(value);
    localStorage.setItem(NavLinks.favourites, JSON.stringify(value));
  };

  const removeModel = (id: string) => {
    const value = { ...favourites };

    delete value[id];

    setFavourites(value);
    localStorage.setItem(NavLinks.favourites, JSON.stringify(value));
  };

  const getIsInFavourites = useCallback(
    (itemId: string) => Object.keys(favourites).includes(itemId),
    [favourites],
  );

  const likeHandler = (itemId: string, props: Product) => {
    if (getIsInFavourites(itemId)) {
      removeModel(itemId);

      return;
    }

    addModel(itemId, props);
  };

  // #endregion

  const favouritesContextValue = useMemo(
    () => ({
      favourites,
      getIsInFavourites,
      likeHandler,
    }),
    [favourites],
  );

  return (
    <FavouritesContext.Provider value={favouritesContextValue}>
      {children}
    </FavouritesContext.Provider>
  );
};
