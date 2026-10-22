import type React from 'react';
import { useFavorites } from '../../../../context/FavoritesContext';
import styles from './FavoritesBadge.module.scss';

export const FavoritesBadge: React.FC = () => {
  const { totalCount } = useFavorites();

  if (totalCount === 0) {
    return null;
  }

  return <span className={styles.badge}>{totalCount}</span>;
};
