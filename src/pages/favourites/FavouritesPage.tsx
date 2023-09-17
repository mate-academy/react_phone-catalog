import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './FavouritesPage.module.scss';
import { HomeIcon } from '../../assets/icons/home-icon';
import { ArrowRight } from '../../assets/icons/ArrowRight';
import { Product } from '../../types/Product';
import { getFavourites } from '../../helpers/Favourites';
import { ProductList } from '../../components/ProductList/ProductList';

export const FavouritesPage: FC = () => {
  const [favourites, setFavourites] = useState<Product[]>([]);

  const updateFavourites = () => {
    const favs = getFavourites();

    setFavourites(favs);
  };

  useEffect(() => {
    updateFavourites();
  }, []);

  return (
    <section className={styles.favourites}>
      <div className={styles.favourites__nav}>
        <Link
          to="/"
          className={styles.navicon}
        >
          <HomeIcon />
        </Link>
        <ArrowRight />
        <div className={styles.favourites__navtext}>
          Favourites
        </div>
      </div>

      <div className={styles.favourites__title}>
        Favourites
      </div>

      <div className={styles.favourites__subtitle}>
        {`${favourites.length} items`}
      </div>

      {!favourites.length ? (
        <div className={styles.nofavourites}>
          <div className={styles.nofavourites__text}>
            The Favorites section will help you
            {' '}
            <br />
            not to lose the product you liked
            {' '}
            <br />
            {' '}
            and quickly buy it during discounts
            {' '}
            <br />
            {' '}
            and additional promotions.
          </div>
          <Link
            to="/"
            className={styles.nofavourites__link}
          >
            <button
              type="button"
              className={styles.nofavourites__button}
            >
              Go shoping
            </button>
          </Link>
        </div>
      ) : (
        <ProductList
          styles={styles.favourites__products}
          products={favourites}
          updateFavourites={updateFavourites}
        />
      )}
    </section>
  );
};
