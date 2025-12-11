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

const Favorites: React.FC = () => {
  const { favorites } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    getProducts()
      .then(fetchedProducts => {
        setProducts(fetchedProducts);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const preparedFavorites = useMemo(
    () => products.filter(product => favorites.includes(product.itemId)),
    [products, favorites],
  );

  return (
    <div className={styles.favoritesPage__container}>
      <PageHeader title="Favourites" showBreadCrumbs variant="favPage" />
      {loading ? (
        <div className={styles.loaderWrapper}>
          <Loader />
        </div>
      ) : (
        <>
          {preparedFavorites.length > 0 ? (
            <div className={styles.favorites__container}>
              <ProductsList products={preparedFavorites} />
            </div>
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
