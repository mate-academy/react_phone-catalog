import { Link } from 'react-router-dom';
import styles from './FavouritesPage.module.scss';
import { StateContext } from '../../Store/Store';
import { useContext } from 'react';
import { ProductCard } from '../Shared/ProductCard';

export const FavouritesPage = () => {
  const { favourites } = useContext(StateContext);

  return (
    <div className={styles.favouritesContainer}>
      <div className={styles.favourites}>
        <div className={styles.favourites__breadcrumbs}>
          <Link to={'/'} className={styles.favourites__breadcrumbsHomeIcon} />
          <div className={styles.favourites__breadcrumbsArrowIcon} />
          <span className={styles.favourites__breadcrumbsText}>Favourites</span>
        </div>

        <h1 className={styles.favourites__title}>Favourites</h1>

        <span className={styles.favourites__itemsAmount}>
          {`${favourites.length} items`}
        </span>

        <div className={styles.favourites__productCards}>
          {favourites.map(product => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
