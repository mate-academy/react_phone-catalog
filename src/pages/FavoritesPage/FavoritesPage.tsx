import { Link } from 'react-router-dom';
import styles from './FavoritesPage.module.scss';
import { useFavorites } from '../../context/FavoritesContext';
import { ProductCard } from '../../components/ProductCard';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <div className={styles.favoritesPage}>
      <div className={styles.container}>
        <div className={styles.breadcrumbs}>
          <Link to="/" className={styles.homeLink}>
            <img src="/img/Home_breadcrumb.svg" alt="Home" />
          </Link>
          <span className={styles.arrow}>
            <img src="/img/arrow_right_gray.svg" alt="arrow right" />
          </span>
          <span className={styles.currentCrumb}>Favourites</span>
        </div>

        <h1 className={styles.title}>Favorites</h1>
        <p className={styles.modelsCount}>{favorites.length} items</p>

        <div className={styles.grid}>
          {favorites.map(phone => (
            <ProductCard key={phone.id} phone={phone} />
          ))}
        </div>
      </div>
    </div>
  );
};
