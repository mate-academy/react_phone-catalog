// src/modules/catalog/CatalogPage.tsx - Product catalog page component
import { useEffect, useMemo } from 'react';
import { api } from '../../api';
import { Product, ProductCategory } from '../../types';
import { useQueryState } from '../../utils/searchParams';
import { ProductsList } from './components/ProductsList';
import { useAsync } from './hooks/useAsync';
import { Pagination } from '../../components/Pagination';
import s from './CatalogPage.module.scss';

type Props = { category: ProductCategory };

export const CatalogPage: React.FC<Props> = ({ category }) => {
  // URL state: sort, page, perPage, query (query is now driven by Header's search)
  const [{ sort = 'age', page = '1', perPage = '8', query = '' }, setQuery] =
    useQueryState({ sort: 'age', page: '1', perPage: '8', query: '' });

  const { run, data, loading, error } = useAsync<Product[]>() as {
    run: (promise: Promise<Product[]>) => void;
    data: Product[] | null;
    loading: boolean;
    error: Error | null;
  };

  useEffect(() => {
    document.title = `${category[0].toUpperCase()}${category.slice(1)} page`;
    run(api.getProducts(category));
  }, [category, run]);

  // Filter + sort (query comes from URL, updated by Header)
  const filtered = useMemo(() => {
    if (!data) {
      return [];
    }

    const q = query.trim().toLowerCase();
    let list = data;

    if (q) {
      list = list.filter(p => p.name.toLowerCase().includes(q));
    }

    switch (sort) {
      case 'title':
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price':
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case 'age':
      default:
        list = [...list].sort((a, b) => b.year - a.year);
    }

    return list;
  }, [data, sort, query]);

  // Pagination math
  const currentPage = Math.max(1, Number(page) || 1);
  const perPageNumber =
    perPage === 'all' ? filtered.length : Math.max(1, Number(perPage) || 8);

  const from = (currentPage - 1) * perPageNumber;
  const to = from + perPageNumber;
  const paged = filtered.slice(from, to);

  const title = category[0].toUpperCase() + category.slice(1);

  return (
    <div>
      <h1 className={s.title}>{title} page</h1>

      {/* Controls (search lives in Header now) */}
      <div className={s.controls}>
        <select
          value={sort}
          onChange={e => setQuery({ sort: e.target.value, page: '1' })}
          title="Sort"
        >
          <option value="age">Newest</option>
          <option value="title">Alphabetically</option>
          <option value="price">Cheapest</option>
        </select>

        <select
          value={perPage}
          onChange={e => setQuery({ perPage: e.target.value, page: '1' })}
          title="Items per page"
        >
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="16">16</option>
          <option value="all">all</option>
        </select>
      </div>

      {loading && <div className="loader">Loading…</div>}

      {error && !loading && (
        <div>
          <p>Something went wrong.</p>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <p>
          {query
            ? `There are no ${category} matching the query`
            : `There are no ${category} yet`}
        </p>
      )}

      {!loading && !error && filtered.length > 0 && (
        <>
          <ProductsList products={paged} />

          {perPage !== 'all' && filtered.length > perPageNumber && (
            <Pagination
              total={filtered.length}
              perPage={perPageNumber}
              currentPage={currentPage}
              onPageChange={p => setQuery({ page: String(p) })}
            />
          )}
        </>
      )}
    </div>
  );
};
