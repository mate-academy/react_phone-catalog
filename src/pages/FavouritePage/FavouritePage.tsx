import React from 'react';
import { useFavouriteValues } from '../../store/FavouriteContext';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Card } from '../../components/Card';
import styles from '../../components/ProductsList/ProductsList.module.scss';

export const FavouritePage: React.FC = () => {
  const { favourites } = useFavouriteValues();
  const favouriteProducts = favourites.map(item => item.product);

  return (
    <div className="page-container">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Favourites' }]} />
      <div className={styles.products__container}>
        <div className={styles.category_info}>
          <h1 className={styles.category_info__title}>Favourites</h1>
          <p className={styles.category_info__description}>
            {favouriteProducts.length} models
          </p>
        </div>
        <div className={styles.products__list__cards}>
          {favouriteProducts.map(product => (
            <div className={styles.products__list__card} key={product.id}>
              <Card product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
