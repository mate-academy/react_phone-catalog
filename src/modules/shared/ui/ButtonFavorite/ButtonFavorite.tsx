import React from 'react';
import styles from './ButtonFavorite.module.scss';
import cn from 'classnames';
import FavoritesHeartLike from '@/assets/icons/FavoritesHeartLike.svg?react';

interface Props {
  isFavorite: boolean;
  onClick: (e: React.MouseEvent) => void;
}

export const ButtonFavorite: React.FC<Props> = ({ isFavorite, onClick }) => {
  return (
    <button
      type="button"
      className={cn(styles.button, {
        [styles.active]: isFavorite,
      })}
      onClick={onClick}
    >
      <FavoritesHeartLike className={styles.icon} />
    </button>
  );
};
