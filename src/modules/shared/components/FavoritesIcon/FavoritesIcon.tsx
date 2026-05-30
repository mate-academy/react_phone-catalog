import { useFavorites } from '../../../../contexts';
import styles from './FavoritesIcon.module.scss';

export const FavoritesIcon = () => {
  const { getFavoritesCount } = useFavorites();
  const count = getFavoritesCount();

  return (
    <a href="#/favorites" className={styles.favoritesIcon}>
      <span className="icon icon__like" />
      {count > 0 && <span className={styles.favoritesIconBadge}>{count}</span>}
    </a>
  );
};
