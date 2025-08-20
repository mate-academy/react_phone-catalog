import React from 'react';
import '@/styles/main.scss';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import classNames from 'classnames';
import styles from './ProductPage.module.scss';
import { Dropdown } from '../shared/components/Dropdown';
import { ProductCard } from '../shared/components/ProductCard';

export const ProductPage: React.FC = () => {
  return (
    <main className="container product_page">
      <Breadcrumbs links={['Phones']}></Breadcrumbs>
      <div className={styles.product_page__text}>
        <h1>Favorites</h1>
        <p className={classNames('text__body', styles.product_page__qty)}>
          5 items
        </p>
      </div>
      <div className={styles.product_page__filters}>
        <Dropdown title="Sort by" option="Most relevant"></Dropdown>
        <Dropdown title="Items on page" option="16"></Dropdown>
      </div>
      <div className={styles.product_page__products}>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
      </div>
      <div className={styles.product_page__pagination}>
        <button className="button__circle button__circle--arrow">
          <i className="icon icon--left"></i>
        </button>
        <div className={styles['product_page__pagination--numbers']}>
          <button className="button__circle button__circle--regular">1</button>
          <button className="button__circle button__circle--regular">2</button>
          <button className="button__circle button__circle--regular">3</button>
          <button className="button__circle button__circle--regular">4</button>
        </div>
        <button className="button__circle button__circle--arrow">
          <i className="icon icon--right"></i>
        </button>
      </div>
    </main>
  );
};
