import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import cl from 'classnames';

import { HomeIcon } from '../../components/Icons/HomeIcon';
import { ArrowRightIcon } from '../../components/Icons/ArrowRightIcon';
import { ProductsList } from '../CatalogPage/components/ProductsList';
import { useFavourites } from '../../hooks/useFavourites';

import styles from './FavouritesPage.module.scss';

export const FavouritesPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { favourites } = useFavourites();

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={cl('container', [styles.section])}>
      <div className={styles.favourites}>
        <div className={styles.breadCrumps}>
          <Link to="/" className={styles.homeLink}>
            <HomeIcon />
          </Link>

          <span className={styles.chevron}>
            <ArrowRightIcon />
          </span>

          <p className={styles.smallTitle}>Favourites</p>
        </div>

        <div className={styles.titleBlock}>
          <h1>Favourites</h1>

          {favourites.length > 0 && (
            <p className={styles.countOfItems}>
              {`${favourites.length} ${favourites.length === 1 ? 'item' : 'items'}`}
            </p>
          )}
        </div>

        {favourites.length > 0 ? (
          <ProductsList products={favourites} isLoading={isLoading} />
        ) : (
          <div className={styles.noFavBlock}>
            <h3>{`Oops, there's nothing here...`}</h3>

            <Link to="/" className={styles.goBack}>
              Back to home
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
