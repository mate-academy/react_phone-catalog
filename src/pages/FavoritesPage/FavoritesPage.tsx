import { Link } from 'react-router-dom';
import { IoHomeOutline, IoChevronForward } from 'react-icons/io5';
import { useFavorites } from '../../context/FavoritesContext';
import ProductsList from '../../components/ProductsList';
import styles from './FavoritesPage.module.scss';

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <div className={styles.favoritesPage}>
      <nav className={styles.breadcrumb}>
        <Link to="/">
          <IoHomeOutline className={styles.homeIcon} aria-hidden="true" />
        </Link>
        <IoChevronForward aria-hidden="true" />
        <span className={styles.categoryLink}>Favorites</span>
      </nav>

      <h1 className={styles.title}>Favorites</h1>
      <p className={styles.count}>{`${favorites.length} items`}</p>

      {favorites.length > 0 ? (
        // Supondo que você tenha um componente ProductsList que renderiza uma lista de produtos
        <ProductsList products={favorites} />
      ) : (
        <div className={styles.emptyMessage}>
          <h2>Your favorites list is empty</h2>
          <p>Click the heart icon on a product to add it to your favorites.</p>
          <Link to="/" className={styles.catalogButton}>
            Continue shopping
          </Link>
        </div>
      )}
    </div>
  );
}
