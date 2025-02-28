/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useMemo, useState } from 'react';
import { FavouritesContext } from '../FavouritesContext';
import { LSKeys } from '../../../enums/LSKeys';
import { Favourites } from '../types/Favourites';
import { Product } from '../../../types/CategoriesTypes/Product';
// eslint-disable-next-line max-len

interface Props {
  children: React.ReactNode;
}

export const FavouritesContextProvider: React.FC<Props> = ({ children }) => {
  const getFavourites = (): Favourites => {
    return JSON.parse(localStorage.getItem(LSKeys.favourites) || '{}');
  };

  const [favourites, setFavourites] = useState<Favourites>(getFavourites());

  // #region functions

  const addModel = (id: string, props: Product) => {
    const value = { ...favourites, [id]: props };

    setFavourites(value);
    localStorage.setItem(LSKeys.favourites, JSON.stringify(value));
  };

  const removeModel = (id: string) => {
    const value = { ...favourites };

    delete value[id];

    setFavourites(value);
    localStorage.setItem(LSKeys.favourites, JSON.stringify(value));
  };

  const getIsIncluded = useCallback(
    (itemId: string) => Object.keys(favourites).includes(itemId),
    [favourites],
  );

  const onClickHandler = (itemId: string, props: Product) => {
    if (getIsIncluded(itemId)) {
      removeModel(itemId);

      return;
    }

    addModel(itemId, props);
  };

  // #endregion

  const favouritesContextValue = useMemo(
    () => ({
      favourites,
      getIsIncluded,
      onClickHandler,
    }),
    [favourites],
  );

  return (
    <FavouritesContext.Provider value={favouritesContextValue}>
      {children}
    </FavouritesContext.Provider>
  );
};
