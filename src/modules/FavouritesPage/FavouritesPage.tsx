import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Loader } from '../../components/Loader';
import { ProductsList } from '../../components/ProductsList';
import { useFavourites } from '../../store/FavouritesContext';
import styles from './FavouritesPage.module.scss';

export const FavouritesPage = () => {
  const { state, loading } = useFavourites();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.favourites}>
      <Breadcrumbs />
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.favourites__content}>
          <div className={styles.favourites__header}>
            <button
              onClick={() => navigate(-1)}
              className={styles.favourites__button}
              aria-label="back"
            >
              <div className={styles.favourites__icon}></div>
              <p className={styles.favourites__text}>Back</p>
            </button>
            {!state.products.length ? (
              <h1 className={styles.favourites__title}>
                Your favourites is empty
              </h1>
            ) : (
              <>
                <h1 className={styles.favourites__title}>Favourites</h1>
                <p className={styles.favourites__quantity}>
                  {state.products.length + ' items'}
                </p>
              </>
            )}
          </div>

          <ProductsList products={state.products} />
        </div>
      )}
    </div>
  );
};
