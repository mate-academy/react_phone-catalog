import { Link, useSearchParams } from 'react-router-dom';

import { ProductsList } from '../../components/ProductsList';
import { useShop } from '../../context/ShopContext';

import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { favorites } = useShop();
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  const normalizedQuery = query.trim().toLowerCase();

  const filteredFavorites = favorites.filter(product =>
    product.name.toLowerCase().includes(normalizedQuery),
  );

  const hasFavorites = favorites.length > 0;
  const hasMatchingProducts = filteredFavorites.length > 0;

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumbs} aria-label="Breadcrumbs">
        <Link to="/">Home</Link>
        <span>/</span>
        <span>Favorites</span>
      </nav>

      <h1 className={styles.title}>Favorites</h1>

      {!hasFavorites ? (
        <div className={styles.empty}>
          <p>You have no favorite products yet</p>

          <Link to="/phones" className={styles.catalogLink}>
            Browse products
          </Link>
        </div>
      ) : (
        <>
          <p className={styles.count}>{filteredFavorites.length} models</p>

          {hasMatchingProducts ? (
            <ProductsList products={filteredFavorites} />
          ) : (
            <div className={styles.empty}>
              <p>There are no products matching the query</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};
