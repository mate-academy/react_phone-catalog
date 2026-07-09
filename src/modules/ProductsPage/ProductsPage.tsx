import React, { useMemo, useCallback } from 'react';
import ProductsList from '../../components/ProductsList/index';
import { Product } from '../../../public/api/types/Product';
import Pagination from '../../components/Pagination/index';
import { productsCount } from '../../utils/products';
import { useSearchParams } from 'react-router-dom';
import styles from './ProductsPage.module.scss';
import { useProducts } from '../../hooks/useProducts';

type ProductsPageProps = {
  category: 'phones' | 'tablets' | 'accessories';
  title: string;
};

export const ProductsPage: React.FC<ProductsPageProps> = ({
  category,
  title,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, loading, error } = useProducts();
  const sort: string = searchParams.get('sort') ?? 'age';

  const filteredProducts = products?.filter(
    p => String(p.category).toLowerCase() === category,
  );
  const total = filteredProducts?.length ?? 0;

  const rawPerPage = searchParams.get('perPage');
  let perPage: number | 'all' = rawPerPage
    ? rawPerPage === 'all'
      ? 'all'
      : Number(rawPerPage)
    : 16;

  if (perPage !== 'all' && ![4, 8, 16].includes(perPage)) {
    perPage = 'all';
  }

  const effectivePerPage = perPage === 'all' ? total : perPage;
  const totalPages =
    effectivePerPage === 0
      ? 1
      : Math.max(1, Math.ceil(total / effectivePerPage));
  const rawPage = searchParams.get('page');
  const pageParsed = rawPage ? Math.max(1, Number(rawPage) || 1) : 1;
  const normalizedPage = Math.min(pageParsed, totalPages);
  const start =
    perPage === 'all' ? 0 : (normalizedPage - 1) * (perPage as number);
  const end = perPage === 'all' ? total : start + (perPage as number);

  const sorted = useMemo(() => {
    if (!filteredProducts) {
      return;
    }

    const copy = filteredProducts.slice();

    if (sort === 'age') {
      return copy.sort((a, b) => Number(b.year) - Number(a.year));
    }

    if (sort === 'title') {
      return copy.sort((a, b) =>
        String(a.title).localeCompare(String(b.title)),
      );
    }

    if (sort === 'price') {
      const effective = (p: Product) =>
        Number(p.price) * (1 - (Number((p as Product).discount) || 0) / 100);

      return copy.sort((a, b) => effective(a) - effective(b));
    }

    return copy;
  }, [filteredProducts, sort]);

  const visibleProducts = sorted?.slice(start, end);

  const handlePaginationChange = (
    newPage: number,
    newPerPage: number | 'all',
  ) => {
    const params = new URLSearchParams(
      Object.fromEntries(searchParams.entries()),
    );

    if (newPerPage === 'all') {
      params.delete('perPage');
      params.delete('page');
    } else {
      params.set('perPage', String(newPerPage));
      params.delete('page');
    }

    if (newPage > 1) {
      params.set('page', String(newPage));
    } else {
      params.delete('page');
    }

    setSearchParams(params);
  };

  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      const params = new URLSearchParams(searchParams);

      if (value === 'age') {
        params.delete('sort');
      } else {
        params.set('sort', value);
      }

      params.delete('page');
      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const raw = e.target.value;
    const v = raw === 'all' ? 'all' : Number(raw);

    handlePaginationChange(1, v);
  };

  return (
    <>
      <div className={styles.productPage}>
        <div className={styles.productPage__content}>
          <section
            id={category}
            aria-label={title}
            className={`${styles.section} ${styles['section--breadcrumbs']}`}
          >
            <h1>{title}</h1>
            <p>{productsCount(products, category)} models</p>
            {!loading && !error && Array.isArray(visibleProducts) && (
              <>
                <div className={styles.productPage__productsFilter}>
                  <div
                    className={`${styles.filterItem} ${styles['filterItem--sort-by']}`}
                  >
                    <label className={styles.label} htmlFor="sort">
                      Sort by
                    </label>
                    <select
                      value={sort}
                      onChange={handleSortChange}
                      className={`${styles.select}`}
                      id="sort"
                    >
                      <option value="age">Newest</option>
                      <option value="title">Alphabetically</option>
                      <option value="price">Cheapest</option>
                    </select>
                  </div>
                  <div
                    className={`${styles.filterItem} ${styles['filterItem--items-on-page']}`}
                  >
                    <label className={styles.label} htmlFor="items-per-page">
                      Items on page
                    </label>
                    <select
                      id="items-per-page"
                      aria-label="Items per page"
                      value={String(perPage)}
                      onChange={handlePerPageChange}
                      className={`${styles.select}`}
                    >
                      <option value="4">4</option>
                      <option value="8">8</option>
                      <option value="16">16</option>
                      <option value="all">All</option>
                    </select>
                  </div>
                </div>
                <ProductsList
                  products={visibleProducts}
                  emptyMessage={`There are no ${category} yet`}
                  skipDiscount="true"
                />
              </>
            )}

            {total > 0 && effectivePerPage < total && (
              <Pagination
                total={total}
                currentPage={normalizedPage}
                perPage={perPage}
                onChange={handlePaginationChange}
              />
            )}
          </section>
        </div>
      </div>
      <div className="product-errors">
        {loading && <div>Loading...</div>}
        {error && <div role="alert">Error: {error}</div>}
        {products && products.length === 0 && <div>No products found.</div>}
      </div>
    </>
  );
};
