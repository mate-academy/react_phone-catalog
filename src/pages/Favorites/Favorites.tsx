import React from 'react';
import PageHeader from '../../shared/components/PageHeader/PageHeader';
import styles from './Favorites.module.scss';
import { ProductsList } from '../../features/product/components/ProductList/ProductList';
import { Loader } from '../../shared/components/Loader';
import emptyFavorites from '/img/empty_favorites.svg';
import { useNavigate } from 'react-router-dom';
import { useFavProducts } from '../../features/favorites/hooks/useFavProducts';
import classNames from 'classnames';

const Favorites: React.FC = () => {
  const navigate = useNavigate();
  const { preparedFavorites, loading, favorites, products } = useFavProducts();

  return (
    <div
      className={classNames(styles.favoritesPage__container, {
        [styles.favoritesPage__containerLoading]: loading,
        [styles['favoritesPage__container--empty']]: products.length === 0,
      })}
    >
      {loading ? (
        <div className={styles.loaderWrapper}>
          <Loader />
        </div>
      ) : (
        <>
          {favorites.length > 0 && preparedFavorites.length > 0 ? (
            <>
              <PageHeader
                title="Favourites"
                showBreadCrumbs
                variant="favPage"
              />
              <div className={styles.favorites__container}>
                <ProductsList products={preparedFavorites} />
              </div>
            </>
          ) : (
            <div className={styles.favorites__empty}>
              <div className={styles.favorites__imageWrapper}>
                <img src={emptyFavorites} alt="No favorites" />
              </div>
              <h2>Your favorites list is empty</h2>
              <span>Fill it with products you like</span>
              <button
                className={styles.favorites__button}
                onClick={() => navigate('/')}
              >
                Choose products
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Favorites;
