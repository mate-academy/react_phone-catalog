import { Link } from 'react-router-dom';

import arrowDownIcon from '../../assets/icons/arrow-down.svg';
import homeIcon from '../../assets/icons/home-button.svg';
import { ProductsGrid } from '../../components/ProductsGrid';
import { useShop } from '../../context/ShopContext';

import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { favorites } = useShop();

  const favoritesCount = favorites.length;

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link to="/" className={styles.homeLink} aria-label="Home">
            <img src={homeIcon} alt="" className={styles.homeIcon} />
          </Link>

          <img src={arrowDownIcon} alt="" className={styles.breadcrumbArrow} />

          <span className={styles.current}>Favourites</span>
        </nav>

        <h1 className={styles.title}>Favourites</h1>

        <p className={styles.count}>
          {favoritesCount} {favoritesCount === 1 ? 'item' : 'items'}
        </p>

        {favoritesCount > 0 ? (
          <ProductsGrid products={favorites} />
        ) : (
          <div className={styles.empty}>
            <h2 className={styles.emptyTitle}>Your favourites list is empty</h2>

            <p className={styles.emptyText}>
              Add products to favourites to find them here.
            </p>

            <Link to="/phones" className={styles.catalogLink}>
              Go to catalogue
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
