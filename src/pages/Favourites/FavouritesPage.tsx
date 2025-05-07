import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import styles from './Favourites.module.scss';
import { ProductsList } from '../../components/ProductsList';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { FavouritesError } from '../../components/Errors/FavouritesError';
import { Loader } from '../../components/Loader';
import { ProductsContext } from '../../store/ProductsContext';
import { FavouritesContext } from '../../store/FavouritesContex';
import { ThemeContext } from '../../store/ThemeContex';
import { Theme } from '../../types/Theme';

export const FavouritesPage = () => {
  const { loading } = useContext(ProductsContext);
  const { favourites } = useContext(FavouritesContext);
  const { theme } = useContext(ThemeContext);
  const { pathname } = useLocation();
  const nameOfPath = pathname.slice(1);

  return (
    <div className={styles['fav-page']}>
      <div className={styles['fav-page__content']}>
        <div>
          <Breadcrumbs />
        </div>

        {loading && <Loader />}

        <h1
          className={cn({
            [styles['fav-page__title']]: theme === Theme.Light,
            [styles['fav-page__title-dark']]: theme === Theme.Dark,
          })}
        >
          Favourites
        </h1>
        {!loading && favourites.length > 0 ? (
          <>
            <p
              className={cn({
                [styles['fav-page__amount']]: theme === Theme.Light,
                [styles['fav-page__amount-dark']]: theme === Theme.Dark,
              })}
            >
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
