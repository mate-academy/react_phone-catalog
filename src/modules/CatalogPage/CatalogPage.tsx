import { useMemo } from 'react';

import layoutStyles from '../../components/Layout/Layout.module.scss';
import styles from './CatalogPage.module.scss';

import { Card } from '../../modules/Card/Card';
import { Pagination } from '../../components/Pagination/Pagination';
import { WithLoader } from '../../components/WithLoader';

import { useProducts } from '../../shared/context/ProductsContext';
import { useQueryParams } from '../../hooks/useQueryParams';
import { useSort } from '../../hooks/useSort';
import { usePagination, type PerPage } from '../../hooks/usePagination';

import { Product } from '../../types/Product';

type Props = {
  type: 'phones' | 'tablets' | 'accessories';
};

const TITLES = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
} as const;

export const CatalogPage: React.FC<Props> = ({ type }) => {
  const { products, loading, error } = useProducts();
  const { params, setParam } = useQueryParams();

  // Filter by category
  const filtered = useMemo(
    () => products.filter((p: Product) => p.category === type),
    [products, type],
  );

  const { sort, sortedProducts, setSort } = useSort(filtered, params, setParam);

  // Pagination
  const { paginatedProducts, page, perPage, totalPages, setPage, setPerPage } =
    usePagination({ products: sortedProducts, params, setParam });

  return (
    <section className={styles.catalog}>
      {/* Header */}
      <div className={styles.headerBlock}>
        <h1 className={styles.title}>{TITLES[type]}</h1>
        <p className={styles.counter}>{filtered.length} models</p>
      </div>

      <WithLoader loading={loading} error={error ? error.toString() : null}>
        {filtered.length === 0 ? (
          <p>There are no {TITLES[type].toLowerCase()} yet</p>
        ) : (
          <>
            {/* Top bar */}
            <div className={styles.topbar}>
              <div className={styles.control}>
                <label htmlFor="sort">Sort by</label>
                <select
                  id="sort"
                  value={sort}
                  onChange={e =>
                    setSort(e.target.value as 'age' | 'title' | 'price')
                  }
                >
                  <option value="age">Newest</option>
                  <option value="title">Alphabetically</option>
                  <option value="price">Cheapest</option>
                </select>
              </div>

              <div className={styles.control}>
                <label htmlFor="perpage">Items on page</label>
                <select
                  id="perpage"
                  value={perPage}
                  onChange={e => setPerPage(e.target.value as PerPage)}
                >
                  <option value="4">4</option>
                  <option value="8">8</option>
                  <option value="16">16</option>
                  <option value="all">All</option>
                </select>
              </div>
            </div>

            {/* GRID — only paginated products */}
            <div className={layoutStyles['layout--grid']}>
              {paginatedProducts.map(product => (
                <Card
                  key={product.id}
                  product={product}
                  variant="grid"
                  showPrices
                  showSpecs
                  showActions
                  showDiscount
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && perPage !== 'all' && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
                total={sortedProducts.length}
              />
            )}
          </>
        )}
      </WithLoader>
    </section>
  );
};
