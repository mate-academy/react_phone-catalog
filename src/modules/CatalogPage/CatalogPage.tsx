import { useEffect, useMemo, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductsList } from '../../components/ProductsList';
import { getProducts } from '../../shared/data/api';
import type { Category, Product } from '../../shared/types';
import styles from './CatalogPage.module.scss';

const labels: Record<Category, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export function CatalogPage({ category }: { category: Category }) {
  const [params, setParams] = useSearchParams();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    setError(false);
    getProducts(category)
      .then(setAllProducts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [category]);

  useEffect(() => {
    load();
  }, [load]);

  const query = params.get('query') ?? '';
  const sort = params.get('sort') ?? 'age';
  const perPage = params.get('perPage') ?? 'all';
  const page = Math.max(1, Number(params.get('page') ?? 1));

  const products = useMemo(() => {
    const result = allProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()),
    );

    result.sort((a, b) =>
      sort === 'title'
        ? a.name.localeCompare(b.name)
        : sort === 'price'
          ? a.price - b.price
          : (b.year ?? 0) - (a.year ?? 0),
    );

    return result;
  }, [allProducts, query, sort]);

  const pageSize =
    perPage === 'all' ? Math.max(products.length, 1) : Number(perPage);
  const pageCount = Math.max(1, Math.ceil(products.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const visible = products.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);

    if (
      !value ||
      (key === 'page' && value === '1') ||
      (key === 'perPage' && value === 'all')
    ) {
      next.delete(key);
    } else {
      next.set(key, value);
    }

    if (key === 'sort' || key === 'perPage' || key === 'query') {
      next.delete('page');
    }

    setParams(next);
  };

  return (
    <section className={styles.page}>
      <div className={styles.breadcrumb}>
        <a href="/">Home</a>&nbsp; › &nbsp;{labels[category]}
      </div>
      <h1>{labels[category]}</h1>
      <p className={styles.count}>{allProducts.length} models</p>
      <div className={styles.filters}>
        <label>
          Sort by
          <select value={sort} onChange={e => update('sort', e.target.value)}>
            <option value="age">Newest</option>
            <option value="title">Alphabetically</option>
            <option value="price">Cheapest</option>
          </select>
        </label>
        <label>
          Items on page
          <select
            value={perPage}
            onChange={e => update('perPage', e.target.value)}
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="all">All</option>
          </select>
        </label>
        <label className={styles.search}>
          Search
          <input
            value={query}
            onChange={e => update('query', e.target.value)}
            placeholder="Search products..."
          />
        </label>
      </div>
      {loading ? (
        <div className={styles.loading} aria-live="polite">
          Loading products…
        </div>
      ) : error ? (
        <div className={styles.empty}>
          Something went wrong. <button onClick={load}>Reload</button>
        </div>
      ) : visible.length ? (
        <ProductsList products={visible} />
      ) : (
        <p className={styles.empty}>
          {query
            ? `There are no ${category} matching the query`
            : `There are no ${category} yet`}
        </p>
      )}
      {!loading && !error && products.length > pageSize && (
        <div className={styles.pagination}>
          <button
            disabled={currentPage <= 1}
            onClick={() => update('page', String(currentPage - 1))}
          >
            ‹
          </button>
          {Array.from({ length: pageCount }, (_, i) => i + 1).map(number => (
            <button
              key={number}
              className={currentPage === number ? styles.current : ''}
              onClick={() => update('page', String(number))}
            >
              {number}
            </button>
          ))}
          <button
            disabled={currentPage >= pageCount}
            onClick={() => update('page', String(currentPage + 1))}
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
