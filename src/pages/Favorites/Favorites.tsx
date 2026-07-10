import { useContext, useEffect, useState } from 'react';
import { getProducts } from '../../api';
import { Product } from '../../types/Product';
import styles from './Favorites.module.scss';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { Loader } from '../../components/Loader';
import { ProductCard } from '../../components/ProductCard';
import { FavoritesContext } from '../../context/FavoritesContext';

export const Favorites = () => {
  const favoritesContext = useContext(FavoritesContext);

  if (!favoritesContext) {
    throw new Error('Must be used within FavoritesProvider');
  }

  const { favoritesItemsIds } = favoritesContext;
  const [favoritesList, setFavoritesList] = useState<Product[]>([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isActive = true;

    setLoading(true);
    getProducts()
      .then(products =>
        products.filter(p => favoritesItemsIds.includes(p.itemId)),
      )
      .then(products => {
        if (isActive) {
          setFavoritesList(products);
        }
      })
      .catch(() => setErrorMessage(true))
      .finally(() => setLoading(false));

    return () => {
      isActive = false;
    };
  }, [favoritesItemsIds]);

  const breadCrumbsElements = [
    { label: 'Home', path: '/' },
    { label: 'Favorites' },
  ];

  return (
    <section className={styles.favoritesPage}>
      <div className={styles.breadCrumbs}>
        <BreadCrumbs elements={breadCrumbsElements} />
      </div>

      {loading && <Loader />}

      <div className={styles.wrapper}>
        <h1 className={styles.title}>Favorites</h1>

        <p className={styles.infoProducts}>
          {`${favoritesItemsIds.length} items`}
        </p>
      </div>

      {!loading && (errorMessage || favoritesItemsIds.length === 0) && (
        <div className={styles.errorContainer}>
          <p className={styles.errorMessage}>
            {`There are no favorites products yet`}
          </p>
          <img
            className={styles.notFoundImg}
            src="/img/product-not-found.png"
            alt="Products is not found"
          />
        </div>
      )}

      {!loading && !errorMessage && favoritesList?.length > 0 && (
        <>
          <div className={styles.favoritesList}>
            {favoritesList.map(item => (
              <div key={item.itemId} className={styles.favoriteItem}>
                <ProductCard product={item} />
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};
