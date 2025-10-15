import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { PhoneCard } from '../Catalog/components/GoodCard/GoodCard';
import styles from './Favorites.module.scss';
import { useFavorites } from './context/FavoritesContext';

export const Favorites: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div className={`${styles.wrapper} pageContent`}>
      <BreadCrumbs category="favorites" />
      <h1 className={styles.title}>Favourites</h1>

      {favorites.length === 0 ? (
        <p className={styles.emptyMessage}>No favorite products yet.</p>
      ) : (
        <>
          <p className={styles.count}>
            {favorites.length} {favorites.length === 1 ? 'item' : 'items'}
          </p>

          <div className={styles.grid}>
            {favorites.map(product => (
              <PhoneCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
