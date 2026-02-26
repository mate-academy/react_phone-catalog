import React, { useEffect, useState, useMemo, useCallback } from 'react';
import ProductsList from '../../components/ProductsList/index';
import { Product } from '../../../public/api/types/Product';
import Pagination from '../../components/Pagination/index';
import { productsCount } from '../../utils/products';
import { useSearchParams } from 'react-router-dom';
import styles from './ProductsPage.module.scss';

type ProductsPageProps = {
  category: 'phones' | 'tablets' | 'accessories';
  title: string;
};

export const ProductsPage: React.FC<ProductsPageProps> = ({
  category,
  title,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const sort: string = searchParams.get('sort') ?? 'age';

  const filteredProducts = products.filter(
    p => String(p.category).toLowerCase() === category,
  );
  const total = filteredProducts.length;

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

  useEffect(() => {
    const ctrl = new AbortController();
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/products.json', { signal: ctrl.signal });

        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await res.json();

        setProducts(data);
      } catch (err) {
        if ((err as DOMException).name === 'AbortError') {
          return;
        }

        setError((err as Error).message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    load();

    return () => ctrl.abort();
  }, [category]);

  const sorted = useMemo(() => {
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
        Number(p.price) * (1 - (Number((p as any).discount) || 0) / 100);

      return copy.sort((a, b) => effective(a) - effective(b));
    }

    return copy;
  }, [filteredProducts, sort]);

  const visibleProducts = sorted.slice(start, end);

  const handleAddToCart = (productId: string) => {
    // TODO: Implement add to cart logic
    console.log('Add to cart:', productId);
  };

  const handleToggleFavorite = (productId: string) => {
    // TODO: Implement toggle favorite logic
    console.log('Toggle favorite:', productId);
  };

  const handlePaginationChange = (
    newPage: number,
    newPerPage: number | 'all',
  ) => {
    const params = new URLSearchParams(searchParams);

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
    const v = e.target.value === 'all' ? 'all' : Number(e.target.value);

    onChange(1, v);
  };

  return (
    <>
      <div className={styles.productPage}>
        <div className={styles.productPage__content}>
          <section id={category} aria-label={title}>
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
                  handleAddToCart={handleAddToCart}
                  handleToggleFavorite={handleToggleFavorite}
                  emptyMessage={`There are no ${category} yet`}
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
