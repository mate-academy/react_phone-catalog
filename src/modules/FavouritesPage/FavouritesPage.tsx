import { Link } from 'react-router-dom';
import styles from './FavouritesPage.module.scss';
import { ProductCard } from '../shared/components/ProductCard';
import { useFavourites } from '../../context/FavouritesContext';

export const FavouritesPage: React.FC = () => {
  const { favourites } = useFavourites();
  const itemsCountText =
    favourites.length === 1 ? '1 item' : `${favourites.length} items`;

  return (
    <div className={styles.favouritesPage}>
      <div className={styles.breadcrumbs} data-cy="breadCrumbs">
        <Link to="/" className={styles.breadcrumbsLink}>
          <img
            className={styles.btnHome}
            src="./img/icons/home.svg"
            alt="Home"
          />
        </Link>

        <img src="./img/icons/arrow-right-disabled.svg" alt="true" />
        <span className={styles.breadcrumbsLink}>Favourites</span>
      </div>

      <h1 className={styles.title}>Favourites</h1>

      <p className={styles.favouritesCount}>{itemsCountText}</p>

      {favourites.length > 0 ? (
        <div className={styles.list} data-cy="productList">
          {favourites.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className={styles.empty}>Your favourites list is empty</p>
      )}
    </div>
  );
};
