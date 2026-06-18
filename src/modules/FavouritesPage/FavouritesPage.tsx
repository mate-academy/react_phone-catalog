import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { ProductCard } from '../shared/components/ProductCard';
import styles from './FavouritesPage.module.scss';
import { RootState } from '../../app/store';
import { Product } from '../../types/Product';

export const FavouritesPage: React.FC = () => {
  const favourites = useAppSelector(
    (state: RootState) => state.shop.favourites,
  );

  return (
    <div className={styles.favouritesPage}>
      <div className={styles.container}>
        <div className={styles.breadcrumbs}>
          <Link to="/" className={styles.homeLink}>
            <img src="img/Home.svg" alt="Home" />
          </Link>
          <img
            src="img/arrow-right.svg"
            alt="Arrow right"
            className={styles.arrow}
          />
          <span className={styles.currentPath}>Favourites</span>
        </div>

        <h1 className={styles.title}>Favourites</h1>

        {favourites.length === 0 ? (
          <div className={styles.emptyState}>
            <h2 className={styles.emptyTitle}>Your favourites list is empty</h2>
            <p className={styles.emptyText}>
              Your favourite items will appear here once you click the heart
              icon on a product card.
            </p>
            <Link to="/phones" className={styles.shopButton}>
              Go to catalog
            </Link>
          </div>
        ) : (
          <>
            <p className={styles.count}>{favourites.length} items</p>
            <div className={styles.grid}>
              {favourites.map((product: Product) => (
                <div key={product.id} className={styles.gridItem}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
