import { Link } from 'react-router-dom';
import styles from './Favorites.module.scss';
import { useContext } from 'react';
import { FavoritesContext } from '../../context/FavoritesContext';
import { ProductCard } from '../../components/ProductCard/ProductCard';

export const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);
  return (
    <div className={styles.favouriteBlock}>
      <div className={styles.breadCrumbs}>
        <Link to="/" className={styles.homeIcon}>
          <img src="/img/icons/Home.png" alt="Home" />
        </Link>
        <img
          src="/img/icons/rightArrow.png"
          alt="right"
          className={styles.separator}
        />

        <span className={styles.productName}>Favourites</span>
      </div>

      <h1 className={styles.title}>Favourites</h1>
      <div className={styles.productGrid}>
        {favorites.map((product: any) => (
          <ProductCard key={product.itemId} product={product} />
        ))}
      </div>
    </div>
  );
};
