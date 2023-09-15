import classNames from 'classnames';
import React, {
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import { FavoritesStorageContext } from '../../Context/FavoritesStorageContext';
import { FavoriteProduct } from '../../types/FavoriteProduct';

import './FavoriteButton.scss';

export const FavoriteButton: FC<FavoriteProduct> = ({
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
    favourites,
    handleAddToFavorites,
    handleRemoveFromFavorites,
  } = useContext(FavoritesStorageContext);

  const [isFavourite, setIsFavourite] = useState(() => {
    try {
      return favourites
        .find((item: FavoriteProduct) => item.itemId === itemId) || false;
    } catch {
      return false;
    }
  });

  const handleFavorites = () => {
    if (!handleRemoveFromFavorites || !handleAddToFavorites) {
      return;
    }

    if (isFavourite) {
      handleRemoveFromFavorites(itemId);
      setIsFavourite(false);
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
      setIsFavourite(true);
    }
  };

  useEffect(() => {
    setIsFavourite(
      favourites.find((item: FavoriteProduct) => item.itemId === itemId)
      || false,
    );
  }, [favourites]);

  return (
    <button
      type="button"
      data-cy="addToFavorite"
      className={classNames(
        'button__add-to-fav',
        { 'button__add-to-fav--selected': isFavourite },
      )}
      aria-label="add-to-fav"
      onClick={handleFavorites}
    />
  );
};
