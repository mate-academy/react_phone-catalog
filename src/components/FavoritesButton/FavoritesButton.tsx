import React from 'react';
import styles from './FavoritesButton.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../store/favoritesSlice';
import { RootState } from '../../store';

type Props = {
  productId: string;
};

export const FavoritesButton: React.FC<Props> = ({ productId }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites);
  const isFavorite = favorites.includes(productId);

  return (
    <button
      className={styles.favBtn}
      onClick={() => dispatch(toggleFavorite(productId))}
    >
      <img
        src={
          isFavorite
            ? './img/icons/favorites-icon-filled.svg'
            : './img/icons/favorites-icon.svg'
        }
        alt="Toggle favorite"
      />
    </button>
  );
};
