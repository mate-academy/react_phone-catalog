import React from 'react';
import styles from './Favourites.module.scss';
import Breadcrumbs from '../shared/components/Breadcrumbs';
import { useLocation } from 'react-router-dom';
import ProductNotFound from '../shared/components/ProductNotFound';
import { useProducts } from '../shared/context/productsContext';
import Card from '../shared/components/Card';

const Favourites = () => {
  const { pathname } = useLocation();
  const currentPath = pathname[1].toUpperCase() + pathname.slice(2);
  const { favorites } = useProducts();

  return (
    <div className={styles.page}>
      <Breadcrumbs />
      <h1 className={styles.page__title}>{currentPath}</h1>
      <div className={styles.page__amount}>{favorites.length} models</div>

      {favorites.length < 1 ? (
        <ProductNotFound currentPath={currentPath} />
      ) : (
        <div className={styles.page__catalog}>
          {favorites.map(product => (
            <div key={product.id} className={styles.page__card}>
              <Card item={product} isHideFullPrice={true} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;
