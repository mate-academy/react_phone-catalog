import styles from './ProductsList.module.scss';
import { ProductCard } from '../ProductCard';
import { Pagination } from '../Pagination';
import { BaseProduct } from '../../types';
// import { useState } from 'react';

interface Props {
  title: string;
  products: BaseProduct[];
  totalPages?: number;
  currentPage?: number;
}

export const ProductsList = ({
  title,
  products,
  totalPages = 5,
  currentPage = 1,
}: Props) => {
  // const [sortBy, setSortBy] = useState();
  // const [perPage, setPerPage] = useState();

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.count}>{products.length} models</p>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel} htmlFor="sort-by">
            Sort by
          </label>
          <select id="sort-by" className={styles.select}>
            <option value="newest">Newest</option>
            <option value="alphabetically">Alphabetically</option>
            <option value="cheapest">Cheapest</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel} htmlFor="items-per-page">
            Items on page
          </label>
          <select id="items-per-page" className={styles.select}>
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>

      <div className={styles.grid}>
        {products.map((product: BaseProduct) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </section>
  );
};
