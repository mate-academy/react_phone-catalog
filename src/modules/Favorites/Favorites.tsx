import React from 'react';
import styles from './Favorites.module.scss';
import { ProductCard } from '../../components/ProductCard';

import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import classNames from 'classnames';
import { Pagination } from '../../components/Pagination';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

export const Favorites: React.FC = ({}) => {
  const allProducts = useSelector((state: RootState) => state.favorites.items);

  return (
    <>
      <section className={classNames(styles.catalog, styles.container)}>
        <Breadcrumbs currentCategory={'Favourites'} />

        <h1 className={styles.catalog__title}>Favourites</h1>

        <p className="catalog__subtitle">{allProducts.length} models</p>

        <div className={styles.catalog__products}>
          {allProducts.map(product => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>

        <Pagination total={allProducts.length} />
      </section>
    </>
  );
};
