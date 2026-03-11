import React from 'react';
import styles from './Favourites.module.scss';
import { FavouritesContext } from '../../FavouritesContext';
import { Link } from 'react-router-dom';
import { ProductList } from '../shared/ProductList/ProductList';

export const Favourites: React.FC = () => {
  const favouritesContext = React.useContext(FavouritesContext);

  if (!favouritesContext) {
    return null;
  }

  const { favItems } = favouritesContext;

  return (
    <div className={styles.favourites}>
      <div className={styles.favourites__container}>
        <div className={styles.breadcrumbs}>
          <Link to="/" className={styles.breadcrumbs__link}>
            <img
              src="img/icons/home.png"
              className={styles.breadcrumbs__icon}
              alt="Home"
            />
          </Link>

          <div className={styles.breadcrumbs__separator}></div>

          <h4 className={styles.breadcrumbs__current}>Favourites</h4>
        </div>

        {favItems.length === 0 ? (
          <>
            <div className={styles.empty__favourites}>
              Your favourites is empty
            </div>
          </>
        ) : (
          <>
            <h2 className={styles.favourites__title}>Favourites</h2>
            <h4
              className={styles.product_page__amount}
            >{`${favItems.length} models`}</h4>

            <ProductList visibleProducts={favItems} />
          </>
        )}
      </div>
    </div>
  );
};
