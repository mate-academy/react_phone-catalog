import {
  FC, useContext, useEffect, useState,
} from 'react';
import classNames from 'classnames';
import { FavoriteItem } from '../../types/FavoriteItem';
import { FavoriteStorageContext } from '../../context/FavoriteStorageContext';

import './FavoriteButton.scss';

export const FavoriteButton: FC<FavoriteItem> = ({
  itemId,
  fullPrice,
  name,
  category,
  image,
  price,
  screen,
  capacity,
  ram,
}) => {
  const {
    favorites,
    handleAddToFavorites,
    handleRemoveFromFavorites,
  } = useContext(FavoriteStorageContext);

  const [isFavorite, setIsFavorite] = useState(() => {
    try {
      return favorites
        .find((item: FavoriteItem) => item.itemId === itemId) || false;
    } catch {
      return false;
    }
  });

  const handleFavorite = () => {
    if (!handleAddToFavorites || !handleRemoveFromFavorites) {
      return;
    }

    if (isFavorite) {
      handleRemoveFromFavorites(itemId);
      setIsFavorite(false);
    } else {
      const newItem = {
        itemId,
        fullPrice,
        name,
        category,
        image,
        price,
        screen,
        capacity,
        ram,
      };

      handleAddToFavorites(newItem);
      setIsFavorite(true);
    }
  };

  useEffect(() => {
    setIsFavorite(
      favorites.find((item: FavoriteItem) => item.itemId === itemId) || false,
    );
  }, [favorites]);

  return (
    <button
      type="button"
      data-cy="addToFavorite"
      onClick={handleFavorite}
      className={classNames(
        'button__add-to-favorite',
        { 'button__add-to-favorite--selected': isFavorite },
      )}
      aria-label="add-to-favorite"
    />
  );
};
