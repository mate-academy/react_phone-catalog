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
    handleAddToFavorite,
    handleRemoveFromFavorite,
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
    if (!handleAddToFavorite || !handleRemoveFromFavorite) {
      return;
    }

    if (isFavorite) {
      handleRemoveFromFavorite(itemId);
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

      handleAddToFavorite(newItem);
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
        { 'button__add-to-fav--selected': isFavorite },
      )}
      aria-label="add-to-favorite"
    />
  );
};
