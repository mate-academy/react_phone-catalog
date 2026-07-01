import { Link, useSearchParams } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
import { ProductsList } from '../ProductPage/components/ProductsList';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const [searchParams] = useSearchParams();
  const { favorites } = useFavorites();
  const query = (searchParams.get('query') || '').trim().toLowerCase();
  const filteredFavorites = favorites.filter(product =>
    product.name.toLowerCase().includes(query),
  );
  const itemLabel = filteredFavorites.length === 1 ? 'item' : 'items';

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Favorites</h1>

      {favorites.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyText}>Your favorites list is empty</p>
          <Link to="/" className={styles.emptyLink}>
            Go shopping
          </Link>
        </div>
      ) : filteredFavorites.length === 0 ? (
        <p className={styles.message}>
          There are no products matching the query
        </p>
      ) : (
        <>
          <p className={styles.count}>
            {filteredFavorites.length} {itemLabel}
          </p>
          <ProductsList products={filteredFavorites} className={styles.grid} />
        </>
      )}
    </div>
  );
};
