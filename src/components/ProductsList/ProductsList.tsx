import styles from './ProductsList.module.scss';
import { ProductCard } from '../ProductCard';
import { Pagination } from '../Pagination';
import { BaseProduct } from '../../types';
import { useSearchParams } from 'react-router-dom';
import { ChangeEvent } from 'react';

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
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sortBy') || 'newest';
  const perPage = searchParams.get('perPage') || 'all';

  function handleQueryChange(
    event: ChangeEvent<HTMLSelectElement>,
    nameParam: string,
  ) {
    const params = new URLSearchParams(searchParams);

    if (event.target.value === '') {
      params.delete(nameParam);
    } else {
      params.set(nameParam, event.target.value);
    }

    setSearchParams(params);
  }

  const sortByHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    handleQueryChange(event, 'sortBy');
  };

  const perPageHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    handleQueryChange(event, 'perPage');
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

      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </section>
  );
};
