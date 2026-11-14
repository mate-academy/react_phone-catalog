import { useFavorites } from '../context/FavoritesContext';
import { ProductList } from '../components/ProductList/ProductList';
import styles from './FavoritesPage.module.scss';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const FavoritesPage = () => {
  const { favorites, totalCount } = useFavorites();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Breadcrumbs items={[{ label: 'Favourites' }]} />
        <h1 className={styles.title}>Favourites</h1>

        <p className={styles.count}>
          {totalCount} {totalCount === 1 ? 'item' : 'items'}
        </p>

        {totalCount === 0 ? (
          <p className={styles.empty}>You have no favorites yet</p>
        ) : (
          <ProductList products={favorites} />
        )}
      </div>
    </div>
  );
};
