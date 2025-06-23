import React from 'react';
import { useFavouriteValues } from '../../store/FavouriteContext';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Card } from '../../components/Card';
import styles from '../../components/ProductsList/ProductsList.module.scss';
import { Product } from '../../types/Product';

export const FavouritePage: React.FC = () => {
  const { favourites } = useFavouriteValues();
  const favouriteProducts = favourites.map(item => item.product);

  const uniqueProducts = favouriteProducts.filter(
    (product, index, self) =>
      product && product.id && self.findIndex(p => p.id === product.id) === index
  );

  return (
    <div className="page-container">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Favourites' }]} />
      <div className={styles.products__container}>
        <div className={styles.category_info}>
          <h1 className={styles.category_info__title}>Favourites</h1>
          <p className={styles.category_info__description}>
            {uniqueProducts.length} models
          </p>
        </div>
        {uniqueProducts.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px' }}>
            <img
              src="/img/product-not-found.png"
              alt="No favorites"
              style={{ maxWidth: '320px', marginBottom: '24px' }}
            />
         
          </div>
        ) : (
          <div className={styles.products__list__cards}>
            {uniqueProducts.map((product: Product) => (
              <div className={styles.products__list__card} key={product.id}>
                <Card product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
