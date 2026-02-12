import React from 'react';

import styles from './FavoritesPage.module.scss';
import { Link } from 'react-router-dom';
import { MainLayout } from '../../layout/MainLayout';
import { ProductsList } from '../shared/components/productsList';
import { useAppSelector } from '../../app/hooks';
import { HomeSvg } from '../shared/svg/HomeSvg';
import { ArrowRightSvg } from '../shared/svg/ArrowRightSvg';

export const FavoritesPage: React.FC = () => {
  const favoritesProducts = useAppSelector(s => s.favourites);

  return (
    <MainLayout>
      <div className={styles.rout}>
        <Link to={'/'} className={styles.icon}>
          <HomeSvg color="var(--home-svg-color)" />
        </Link>

        <ArrowRightSvg color="var(--disable-arrow-svg)" />

        <span className={styles.currentPage}>{'Favourites'}</span>
      </div>

      <h1 className={styles.title}>Favourites</h1>

      <span className={styles.countProducts}>
        {favoritesProducts.length} items
      </span>

      <section className={styles.productList}>
        <ProductsList products={favoritesProducts} />
      </section>
    </MainLayout>
  );
};
