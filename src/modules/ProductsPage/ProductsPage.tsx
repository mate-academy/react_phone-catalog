import { useEffect, useMemo, useState } from 'react';

import { getProductsByCategory } from '../../shared/api';

import type { Category, Product } from '../../shared/types';

import Breadcrumbs from '../../components/Breadcrumbs';
import EmptyState from '../../components/EmptyState';
import Loader from '../../components/Loader';
import Pagination from '../../components/Pagination';
import ProductsList from '../../components/ProductsList';

import styles from './ProductsPage.module.scss';

type Props = {
  category: Category;
  query: string;
  navigate: (to: string) => void;
};

const categoryNames: Record<Category, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export default function ProductsPage({ category, query, navigate }: Props) {
  const params = new URLSearchParams(window.location.search);

  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [sort, setSort] = useState(params.get('sort') || 'age');

  const [perPage, setPerPage] = useState(params.get('perPage') || 'all');

  const [page, setPage] = useState(Number(params.get('page') || 1));

  useEffect(() => {
    setLoading(true);
    setError(false);

    getProductsByCategory(category)
      .then(setProducts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [category]);

  const filtered = useMemo(() => {
    const normalized = query.toLowerCase().trim();

    if (!normalized) {
      return products;
    }

    const words = normalized.split(/\s+/).filter(Boolean);

    return products.filter(product => {
      const searchable = `${product.name} ${product.color}`.toLowerCase();

      return words.every(word => searchable.includes(word));
    });
  }, [products, query]);

  const sorted = useMemo(() => {
    const result = [...filtered];

    if (sort === 'title') {
      return result.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sort === 'price') {
      return result.sort((a, b) => a.priceDiscount - b.priceDiscount);
    }

    return result.sort((a, b) => b.year - a.year);
  }, [filtered, sort]);

  const size = perPage === 'all' ? sorted.length || 1 : Number(perPage);

  const totalPages = Math.max(1, Math.ceil(sorted.length / size));

  const currentPage = Math.min(page, totalPages);

  const visible =
    perPage === 'all'
      ? sorted
      : sorted.slice((currentPage - 1) * size, currentPage * size);

  const updateUrl = (
    nextSort: string,
    nextPage: number,
    nextPerPage: string,
  ) => {
    const nextParams = new URLSearchParams(window.location.search);

    if (nextSort === 'age') {
      nextParams.delete('sort');
    } else {
      nextParams.set('sort', nextSort);
    }

    if (nextPage === 1) {
      nextParams.delete('page');
    } else {
      nextParams.set('page', String(nextPage));
    }

    if (nextPerPage === 'all') {
      nextParams.delete('perPage');
    } else {
      nextParams.set('perPage', nextPerPage);
    }

    if (query) {
      nextParams.set('query', query);
    }

    const string = nextParams.toString();

    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}${string ? `?${string}` : ''}`,
    );
  };

  const changeSort = (value: string) => {
    setSort(value);
    setPage(1);

    updateUrl(value, 1, perPage);
  };

  const changePerPage = (value: string) => {
    setPerPage(value);
    setPage(1);

    updateUrl(sort, 1, value);
  };

  const changePage = (value: number) => {
    setPage(value);

    updateUrl(sort, value, perPage);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <EmptyState
        text="Something went wrong"
        action="Reload"
        onAction={() => window.location.reload()}
      />
    );
  }

  return (
    <section className={styles.page}>
      <Breadcrumbs
        items={[
          {
            label: 'Home',
            onClick: () => navigate('/'),
          },
          {
            label: categoryNames[category],
          },
        ]}
      />

      <div className={styles.heading}>
        <div>
          <h1>{categoryNames[category]} page</h1>

          <p>{products.length} products</p>
        </div>

        <div className={styles.actions}>
          <label>
            Sort by
            <select
              value={sort}
              onChange={event => changeSort(event.target.value)}
            >
              <option value="age">Newest</option>

              <option value="title">Alphabetically</option>

              <option value="price">Cheapest</option>
            </select>
          </label>

          <label>
            Items on page
            <select
              value={perPage}
              onChange={event => changePerPage(event.target.value)}
            >
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="all">all</option>
            </select>
          </label>
        </div>
      </div>

      {query && (
        <div className={styles.query}>
          Search results for <strong>“{query}”</strong>
          <button type="button" onClick={() => navigate(`/${category}`)}>
            Clear
          </button>
        </div>
      )}

      {!sorted.length ? (
        <EmptyState
          text={
            query
              ? `There are no ${category} matching the query`
              : `There are no ${category} yet`
          }
        />
      ) : (
        <>
          <ProductsList products={visible} navigate={navigate} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChange={changePage}
          />
        </>
      )}
    </section>
  );
}
