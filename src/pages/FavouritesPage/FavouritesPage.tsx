import styles from './FavouritesPage.module.scss';
import { useContext } from 'react';
import { CartFavouritesContext } from '../../contexts/CartFavouritesContext';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductsList } from '../../components/ProductsList';
// eslint-disable-next-line max-len
import { useCartAndFavouritesCount } from '../../utils/hooks/useCartAndFavouritesCount';
import { useLoading } from '../../utils/hooks/useLoading';
import { TIMEOUT_LOADING_DURATION } from '../../utils/constants';

export const FavouritesPage = () => {
  const { favouritesCount } = useCartAndFavouritesCount();
  const { state } = useContext(CartFavouritesContext);
  const { favourites } = state;
  const isLoading = useLoading(TIMEOUT_LOADING_DURATION);

  return (
    <div className={styles['favourites-page']}>
      <section className={styles['favourites-page__breadcrumbs']}>
        <Breadcrumbs />
      </section>

      <h1 className={styles['favourites-page__title']}>Favourites</h1>

      {favouritesCount === 0 ? (
        <p className={styles['favourites-page__empty']}>
          Your favourites is empty
        </p>
      ) : (
        <>
          <p className={styles['favourites-page__items-count']}>
            {favouritesCount} items
          </p>

          <section className={styles['favourites-page__items']}>
            <ProductsList products={favourites} isLoading={isLoading} />
          </section>
        </>
      )}
    </div>
  );
};
