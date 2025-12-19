import React, { useEffect, useMemo, useState } from 'react';
import PageHeader from '../shared/components/PageHeader/PageHeader';
import { useCart } from '../CartFavContext/CartContext';
import styles from './Favorites.module.scss';
import { getProducts } from '@/api/api';
import { Product } from '@/types';
import { ProductsList } from '../shared/components/ProductList/ProductList';
import { Loader } from '../shared/components/Loader';
import emptyFavorites from '/img/empty_favorites.svg';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

const Favorites: React.FC = () => {
  const { favorites } = useCart();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);

  // 1. Якщо у нас вже є улюблені товари (ID), ставимо loading true.
  // Якщо масив ID порожній — loading false (відразу покажемо Empty State без запиту)
  const [loading, setLoading] = useState<boolean>(favorites.length > 0);

  useEffect(() => {
    // 2. Оптимізація: Якщо улюблених немає, не робимо запит
    if (favorites.length === 0) {
      setLoading(false);
      return;
    }

    setLoading(true);

    getProducts()
      .then(fetchedProducts => {
        setProducts(fetchedProducts);
      })
      .catch(console.error) // Варто додати обробку помилок
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const preparedFavorites = useMemo(
    () => products.filter(product => favorites.includes(product.itemId)),
    [products, favorites],
  );

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
          {/* Тут також перевіряємо favorites.length, щоб уникнути ситуації,
              коли запит пройшов, але збігів не знайдено (хоча логічно це те саме) */}
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
