import React, { useState } from 'react';
import { Product, SortType } from '../../../../types/Product';
import { Breadcrumbs } from '../Breadcrumbs';
import styles from './CatalogPageContent.module.scss';
import { getSortedProducts } from '../../../../utils/products';
import { ProductList } from '../ProductList/ProductList';

type Props = {
  title: string;
  products: Product[];
};

export const CatalogPageContent: React.FC<Props> = ({ title, products }) => {
  const [sortBy, setSortBy] = useState<SortType>('newest');

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value as SortType);
  };

  const sortedProducts = getSortedProducts(products, sortBy);

  return (
    <main>
      <Breadcrumbs />
      <h1 className={styles.pageTitle}>{title}</h1>
      <p className={styles.modelsCount}>{`${products.length} models`}</p>

      <div className={styles.controls}>
        <div className={styles.control}>
          <label htmlFor="sortBy" className={styles.controlLabel}>
            Sort by
          </label>
          <select
            id="sortBy"
            className={styles.controlSelect}
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="newest">Newest</option>
            <option value="alphabetically">Alphabetically</option>
            <option value="cheapest">Cheapest</option>
          </select>
        </div>

        <div className={styles.control}>
          <label htmlFor="perPage" className={styles.controlLabel}>
            Items on page
          </label>
          <select name="" id="perPage" className={styles.controlSelect}>
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>

      {/* <ProductList products={sortedProducts} isSlider={false} /> */}
      <ProductList products={sortedProducts} />
    </main>
  );
};
