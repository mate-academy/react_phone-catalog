import { Link } from 'react-router-dom';
import { ProductCard } from '../../components/ProductCard';
import { useCart } from '../../context/CartContext';
import styles from './Favorites.module.scss';
import { Icon } from '../../components/Icon';

export const FavoritesPage = () => {
  const { favorites } = useCart();

  return (
    <div className={styles.favorites}>
      <nav className={styles.favorites__nav}>
        <Link to="/" className={styles.favorites__homeLink}>
          <Icon name="home" />
        </Link>
        <span className={styles.favorites__separator}>&gt;</span>
        <span className={styles.favorites__current}>Favorites</span>
      </nav>
      <h1 className={styles.favorites__title}>Favorites</h1>
      <p className={styles.favorites__count}>{favorites.length} items</p>
      {favorites.length > 0 ? (
        <div className={styles.favorites__container}>
          {favorites.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className={styles.favorites__empty}>
          <h2>Your favorites list is empty</h2>
          <Link to="/phones" className={styles.favorites__shopNow}>
            Go shopping
          </Link>
        </div>
      )}
    </div>
  );
};
