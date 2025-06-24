import React from 'react';
import styles from './FavoritesButton.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../store/favoritesSlice';
import { RootState } from '../../store';
import { useTheme } from '../../hooks/useTheme';

type Props = {
  productId: string;
};

export const FavoritesButton: React.FC<Props> = ({ productId }) => {
  const { theme } = useTheme();
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
            ? '/react_phone-catalog/img/icons/favorites-icon-filled.svg'
            : `/react_phone-catalog/img/icons/favorites-icon-${theme}.svg`
        }
        alt="Toggle favorite"
      />
    </button>
  );
};
