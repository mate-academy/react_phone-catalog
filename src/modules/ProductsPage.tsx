import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getProducts } from '../api';
import type { Product } from '../types';
import type { CartItem } from '../types';
import { ProductsList } from '../shared/components/ProductsList';
import { Container } from '../shared/components/Container';
import { Loader } from '../shared/components/Loader';
import { ErrorMessage } from '../shared/components/ErrorMessage';
import styles from './ProductsPage.module.scss';
import { Breadcrumbs } from '../shared/components/Breadcrums';

type Category = 'phones' | 'tablets' | 'accessories';
type SortKey = 'age' | 'title' | 'price';
type PerPage = '4' | '8' | '16' | 'all';
type ParamsPatch = Partial<{
  sort: SortKey;
  perPage: PerPage;
  page: number;
  query?: string;
}>;

type Props = {
  cart: CartItem[];
  favorites: Product[];
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
};

export const ProductsPage: React.FC<Props> = ({
  cart,
  favorites,
  onAddToCart,
  onToggleFavorite,
}) => {
  const { pathname } = useLocation();
  const category = pathname.slice(1) as Category;

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const [searchValue, setSearchValue] = useState(query);
  const sort = (searchParams.get('sort') as SortKey) || 'age';
  const perPage = (searchParams.get('perPage') as PerPage) || 'all';
  const page = Math.max(1, Number(searchParams.get('page') || 1));

  const updateParams = useCallback(
    (patch: ParamsPatch) => {
      const next = new URLSearchParams(searchParams);

      const nextSort = patch.sort ?? (next.get('sort') as SortKey) ?? 'age';
      const nextPerPage =
        patch.perPage ?? (next.get('perPage') as PerPage) ?? 'all';
      const nextPage = patch.page ?? Number(next.get('page') || '1');

      if (nextSort === 'age') {
        next.delete('sort');
      } else {
        next.set('sort', nextSort);
      }

      if (nextPerPage === 'all') {
        next.delete('perPage');
      } else {
        next.set('perPage', nextPerPage);
      }

      if (nextPage === 1) {
        next.delete('page');
      } else {
        next.set('page', String(nextPage));
      }

      if ('query' in patch) {
        if (!patch.query) {
          next.delete('query');
        } else {
          next.set('query', patch.query);
        }
      }

      setSearchParams(next);
    },
    [searchParams, setSearchParams],
  );

  const sortedProducts = useMemo(() => {
    const list = [...products];

    switch (sort) {
      case 'title':
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case 'price':
        return list.sort((a, b) => a.price - b.price);
      case 'age':
      default:
        return list.sort((a, b) => b.year - a.year);
    }
  }, [products, sort]);

  const filteredProducts = useMemo(() => {
    if (!query) {
      return sortedProducts;
    }

    const q = query.toLowerCase();

    return sortedProducts.filter(product =>
      product.name.toLowerCase().includes(q),
    );
  }, [sortedProducts, query]);

  const perPageNumber =
    perPage === 'all' ? Math.max(1, filteredProducts.length) : Number(perPage);
  const totalPages =
    perPage === 'all'
      ? 1
      : Math.max(1, Math.ceil(filteredProducts.length / perPageNumber));

  useEffect(() => {
    if (page > totalPages) {
      updateParams({ page: totalPages });
    }
  }, [page, totalPages, updateParams]);

  useEffect(() => {
    setSearchValue(query);
  }, [query]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateParams({
        ...(searchValue ? { query: searchValue } : { query: undefined }),
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchValue, updateParams]);

  const visibleProducts = useMemo(() => {
    if (perPage === 'all') {
      return filteredProducts;
    }

    const startIndex = (page - 1) * perPageNumber;
    const endIndex = startIndex + perPageNumber;

    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, perPage, page, perPageNumber]);

  const title = useMemo(() => {
    if (category === 'phones') {
      return 'Mobile phones';
    }

    if (category === 'tablets') {
      return 'Tablets';
    }

    return 'Accessories';
  }, [category]);

  const emptyText = useMemo(() => {
    if (category === 'phones') {
      return 'There are no phones yet';
    }

    if (category === 'tablets') {
      return 'There are no tablets yet';
    }

    return 'There are no accessories yet';
  }, [category]);

  const loadProducts = useCallback(() => {
    setIsLoading(true);
    setError('');

    getProducts(category)
      .then(setProducts)
      .catch(() => setError('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, [category]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const cartIds = new Set(cart.map(item => item.product.itemId));
  const favoriteIds = new Set(favorites.map(item => item.itemId));
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Container>
      <Breadcrumbs />

      <h1>{title}</h1>
      <p className={styles.count}>{products.length} models</p>
      <div className={styles.content}>
        {isLoading && <Loader />}
        {!isLoading && !error && products.length > 0 && (
          <>
            <div className={styles.controls}>
              <label>
                Sort by:{' '}
                <select
                  value={sort}
                  onChange={e =>
                    updateParams({ sort: e.target.value as SortKey, page: 1 })
                  }
                >
                  <option value="age">Newest</option>
                  <option value="title">Alphabetically</option>
                  <option value="price">Cheapest</option>
                </select>
              </label>
              <label>
                Items on page:{' '}
                <select
                  value={perPage}
                  onChange={e =>
                    updateParams({
                      perPage: e.target.value as PerPage,
                      page: 1,
                    })
                  }
                >
                  <option value="4">4</option>
                  <option value="8">8</option>
                  <option value="16">16</option>
                  <option value="all">all</option>
                </select>
              </label>
            </div>
          </>
        )}
        {isLoading && <Loader />}
        {!isLoading && error && (
          <ErrorMessage message={error} onRetry={loadProducts} />
        )}
        {!isLoading && !error && filteredProducts.length === 0 && (
          <p>
            {query ? `There are no ${category} matching the query` : emptyText}
          </p>
        )}
        {!isLoading && !error && products.length > 0 && (
          <ProductsList
            products={visibleProducts}
            cartIds={cartIds}
            favoriteIds={favoriteIds}
            onAddToCart={onAddToCart}
            onToggleFavorite={onToggleFavorite}
          />
        )}
      </div>
      {perPage !== 'all' && totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            type="button"
            className={styles.pageButton}
            disabled={page === 1}
            onClick={() => {
              updateParams({ page: page - 1 });
            }}
          >
            {'<'}
          </button>
          {pages.map(p => (
            <button
              key={p}
              className={`${styles.pageNumber} ${p === page ? styles.active : ''}`}
              onClick={() => updateParams({ page: p })}
            >
              {p}
            </button>
          ))}
          <button
            type="button"
            className={styles.pageButton}
            disabled={page === totalPages}
            onClick={() => {
              updateParams({ page: page + 1 });
            }}
          >
            {'>'}
          </button>
        </div>
      )}
    </Container>
  );
};
