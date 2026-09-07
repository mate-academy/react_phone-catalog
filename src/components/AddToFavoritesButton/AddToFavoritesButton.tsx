import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { useFavorites } from '../../hooks';

import { FilledHeartIcon, HeartIcon } from '../icons';

import styles from './AddToFavoritesButton.module.scss';

type Props = {
  productId: string;
  isClickable?: boolean;
  className?: string;
};

export const AddToFavoritesButton: React.FC<Props> = ({
  productId,
  isClickable = true,
  className = '',
}) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [isAddedToFavorites, setIsAddedToFavorites] = useState(false);

  useEffect(() => {
    setIsAddedToFavorites(favorites.some(fav => fav.itemId === productId));
  }, [favorites, productId]);

  const toggleFavorite = () => {
    if (!isClickable) {
      return;
    }

    if (isAddedToFavorites) {
      removeFavorite(productId);
    } else {
      addFavorite({ itemId: productId });
    }
  };

  return (
    <button
      className={classNames(styles['add-to-fav-btn'], className)}
      onClick={toggleFavorite}
    >
      {isAddedToFavorites ? (
        <FilledHeartIcon
          className={classNames(
            styles['add-to-fav-btn__heart-icon'],
            styles['add-to-fav-btn__heart-icon--active'],
          )}
        />
      ) : (
        <HeartIcon className={styles['add-to-fav-btn__heart-icon']} />
      )}
    </button>
  );
};
