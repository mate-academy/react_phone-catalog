/* eslint-disable import/extensions */
import React, { useEffect, useMemo, useState } from 'react';
import '@/styles/main.scss';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import classNames from 'classnames';
import styles from './ProductPage.module.scss';
import { Dropdown } from '../shared/components/Dropdown';
import { useProducts } from '@/hooks/useProducts';
import { ProductsList } from '../shared/components/ProductsList';
import { ErrorMessage } from '../shared/components/ErrorMessage';
import { Loader } from '../shared/components/Loader';

interface Props {
  category: string;
}

export const ProductPage: React.FC<Props> = ({ category }) => {
  const { products, loading, error } = useProducts();

  const filteredProducts = useMemo(() => {
    return products.filter(
      product => product.category === category.toLowerCase(),
    );
  }, [products, category]);

  const pageProducts = filteredProducts.slice(0, 16);

  return (
    <main className={classNames('container', styles.product_page)}>
      <Breadcrumbs links={[category]}></Breadcrumbs>
      <div className={styles.product_page__text}>
        <h1>{category}</h1>
        <p className={classNames('text__body', styles.product_page__qty)}>
          {products.length} items
        </p>
      </div>
      <div className={styles.product_page__filters}>
        <Dropdown
          title="Sort by"
          selectedOption="Most relevant"
          options={[
            'Most relevant',
            'Most recent',
            'Price, low to high',
            'Price, high to low',
          ]}
        ></Dropdown>
        <Dropdown
          title="Items on page"
          selectedOption="16"
          options={['16', '32', '48', 'All']}
        ></Dropdown>
      </div>
      {loading && <Loader />}
      {error && <ErrorMessage message={error}></ErrorMessage>}
      {pageProducts && (
        <>
          <ProductsList products={pageProducts}></ProductsList>
          <div className={styles.product_page__pagination}>
            <button className="button__circle button__circle--arrow">
              <i className="icon icon--left"></i>
            </button>
            <div className={styles['product_page__pagination--numbers']}>
              <button className="button__circle button__circle--regular">
                1
              </button>
              <button className="button__circle button__circle--regular">
                2
              </button>
              <button className="button__circle button__circle--regular">
                3
              </button>
              <button className="button__circle button__circle--regular">
                4
              </button>
            </div>
            <button className="button__circle button__circle--arrow">
              <i className="icon icon--right"></i>
            </button>
          </div>
        </>
      )}
    </main>
  );
};
