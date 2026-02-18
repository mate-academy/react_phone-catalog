import styles from './Favourites.module.scss';
import { Breadcrumbs } from '../Breadcrumbs';
import { useAppSelector } from '../../utils/hooks';
import {
  selectFavorites,
  selectFavoritesCount,
} from '../../features/favorites';
import { ItemCard } from '../ItemCard';

export const Favourites: React.FC = () => {
  const favorites = useAppSelector(state => selectFavorites(state));
  const countOfFavorites = useAppSelector(state => selectFavoritesCount(state));

  return (
    <div className={styles.favorites}>
      <div className={styles.breadcrumbs}>
        <Breadcrumbs category="favourites" />
      </div>
      <h1 className={styles.favorites__title}>Favourites</h1>
      <h2 className={styles.favorites__itemsCount}>{countOfFavorites} items</h2>
      <div className={styles.favorites__items}>
        {favorites.map(favorite => (
          <ItemCard key={favorite.id} item={favorite} />
        ))}
      </div>
    </div>
  );
};
