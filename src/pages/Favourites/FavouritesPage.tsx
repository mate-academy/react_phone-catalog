import { useContext } from 'react';
import { ProductsContext } from '../../store/ProductsContext';
import styles from './Favourites.module.scss';
import { useLocation } from 'react-router-dom';
import { ProductsList } from '../../components/ProductsList';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { FavouritesError } from '../../components/Errors/FavouritesError';
import { Loader } from '../../components/Loader';
import { FavouritesContext } from '../../store/FavouritesContex';

export const FavouritesPage = () => {
  const { loading } = useContext(ProductsContext);
  const { favourites } = useContext(FavouritesContext);

  const { pathname } = useLocation();
  const nameOfPath = pathname.slice(1);

  return (
    <div className={styles['fav-page']}>
      <div className={styles['fav-page__content']}>
        <div>
          <Breadcrumbs />
        </div>

        {loading && <Loader />}

        <h1 className={styles['fav-page__title']}>Favourites</h1>
        {!loading && favourites.length > 0 ? (
          <>
            <p className={styles['fav-page__amount']}>
              {favourites.length} item{favourites.length === 1 ? '' : 's'}
            </p>
            <ProductsList products={favourites} />
          </>
        ) : (
          <div>
            <FavouritesError path={nameOfPath} />
          </div>
        )}
      </div>
    </div>
  );
};
