import styles from './ProductsList.module.scss';
import { ProductCard } from '../ProductCard';
import { Pagination } from '../Pagination';
import { BaseProduct } from '../../types';
import { ChangeEvent } from 'react';

interface Props {
  title: string;
  products: BaseProduct[];
  totalPages?: number;
  sortBy: 'newest' | 'alphabetically' | 'cheapest';
  perPage: '4' | '8' | '16' | 'all';
  currentPage?: number;
  onSortChange?: (value: string) => void;
  onPerPageChange?: (value: string) => void;
  onPageChange: (value: number) => void;
}

export const ProductsList = ({
  title,
  products,
  sortBy = 'newest',
  onSortChange,
  onPerPageChange,
  totalPages = 0,
  perPage = 'all',
  currentPage = 1,
  onPageChange,
}: Props) => {
  const sortByHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange?.(event.target.value);
  };

  const perPageHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    onPerPageChange?.(event.target.value);
  };

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.count}>{products.length} models</p>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel} htmlFor="sort-by">
            Sort by
          </label>
          <select
            id="sort-by"
            className={styles.select}
            value={sortBy}
            onChange={event => {
              sortByHandler(event);
            }}
          >
            <option value="newest">Newest</option>
            <option value="alphabetically">Alphabetically</option>
            <option value="cheapest">Cheapest</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel} htmlFor="items-per-page">
            Items on page
          </label>
          <select
            id="items-per-page"
            className={styles.select}
            value={perPage}
            onChange={event => {
              perPageHandler(event);
            }}
          >
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

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </section>
  );
};
