import { Link } from 'react-router-dom';
import { Icon } from '../../components/Icon';
import styles from '../FavoritesPage/FavoritesPage.module.scss';
import { useFavorites } from '../shared/context/FavoritesContext';
import { Catalog } from '../../components/Catalog';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <div className="container">
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <Link to="/">
          <Icon variant="home" />
        </Link>

        <div className={styles.breadcrumbArrow}>
          <Icon variant="arrow-right" />
        </div>

        <span className={styles.breadcrumbCurrent}>Favorites</span>
      </nav>

      <h1>Favorites</h1>

      <p className="body-text">{favorites.length} items</p>

      {favorites.length > 0 ? (
        <Catalog className={styles.catalog} products={favorites} />
      ) : (
        <span className={styles.emptyFavorites}>There are no items yet</span>
      )}
    </div>
  );
};
