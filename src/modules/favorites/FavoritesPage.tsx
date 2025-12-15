import { useLocation } from 'react-router-dom';
import { Breadcrumbs } from '../../shared/ui/breadcrumbs';
import styles from './FavoritesPage.module.scss';
import { useContext } from 'react';
import { ProductsStateContext } from '../../shared/context/ProductsContext';
import { Loader } from '../../shared/ui/loader';
import { ErrorMessage } from '../../shared/ui/errorMessage';
import { ProductsList } from '../../shared/ui/productsList';

export const FavoritesPage = () => {
  const { pathname } = useLocation();
  const { products, loading, errorMessage } = useContext(ProductsStateContext);

  const allProducts = products.filter(product =>
    product.hasOwnProperty('isFavorite'),
  );

  return (
    <div className={styles.container}>
      <Breadcrumbs pathname={pathname} />
      <h1 className={styles.title}>Favorites</h1>
      <p className={`body-text ${styles.info}`}>{allProducts.length} models</p>

      {loading && <Loader />}

      {!loading && errorMessage && <ErrorMessage />}

      {!loading && !errorMessage && allProducts.length === 0 && (
        <p className={`button-text ${styles.notification}`}>
          There are no favorites items yet
        </p>
      )}

      {!loading && !errorMessage && allProducts.length > 0 && (
        <ProductsList products={allProducts} />
      )}
    </div>
  );
};
