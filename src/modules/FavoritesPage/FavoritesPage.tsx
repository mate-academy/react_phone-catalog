import { NavLink } from 'react-router-dom';
import styles from './FavoritesPage.module.scss';
import { useFavorites } from '../shared/context/FavoriteContext';
import { useProducts } from '../shared/hooks/useProducts';
import { ProductsList } from '../shared/components/ProductsList';
import { Loader } from '../shared/components/Loader';
import { getPublicPath } from '../shared/utils/getPublicPath';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();
  const { products, loading, error } = useProducts();
  const visibleProducts = products.filter(p => favorites.includes(p.itemId));

  if (loading) {
    return <Loader />;
  }

  if (error || !products) {
    return <p>Products not found</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.favoritesPage}>
        <div className={styles.favoritesPageNav}>
          <NavLink to="/" className={styles.favoritesPageIcon}>
            <img src={getPublicPath('/img/Home.svg')} alt="homeIcon" />
          </NavLink>
          <span
            className={`${styles.favoritesPageIcon} ${styles.favoritesPageArrow}`}
          >
            <img src={getPublicPath('/img/comon-arrow.svg')} alt="arrow" />
          </span>
          <NavLink to={`/favorites`} className={styles.favoritesPageLink}>
            Favourites
          </NavLink>
        </div>

        <h1 className={styles.favoritesPageTitle}>Favourites</h1>

        {favorites.length === 0 ? (
          <div className={styles.favoritesPageEmpty}>
            <p>Your favorites is empty</p>
          </div>
        ) : (
          <>
            <h3 className={styles.favoritesPageCount}>
              {favorites.length} items
            </h3>

            <div className={styles.favoritesPageList}>
              <ProductsList products={visibleProducts} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
