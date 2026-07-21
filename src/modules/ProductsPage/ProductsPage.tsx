import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Category, Product } from '../../types/Product';
import { getProductsByCategory } from '../../api/products';
import { Loader } from '../shared/components/Loader';
import { ProductsList } from '../shared/components/ProductsList';

type Props = { category: Category; title: string };

export const ProductsPage = ({ category, title }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || 'age';
  const query = searchParams.get('query') || '';
  const perPage = searchParams.get('perPage') || 'all';
  const requestedPage = Math.max(1, Number(searchParams.get('page')) || 1);

  const loadProducts = () => {
    setIsLoading(true);
    setHasError(false);
    getProductsByCategory(category)
      .then(setProducts)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  };

  useEffect(loadProducts, [category]);

  const filteredProducts = useMemo(() => {
    const result = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()),
    );

    return [...result].sort((a, b) => {
      if (sort === 'title') {
        return a.name.localeCompare(b.name);
      }

      if (sort === 'price') {
        return a.price - b.price;
      }

      return b.year - a.year;
    });
  }, [products, query, sort]);
  const pageSize =
    perPage === 'all' ? filteredProducts.length || 1 : Number(perPage);
  const pageCount = Math.ceil(filteredProducts.length / pageSize);
  const page = Math.min(requestedPage, Math.max(1, pageCount));
  const shownProducts = filteredProducts.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );
  const changeParams = (changes: Record<string, string | null>) => {
    const next = new URLSearchParams(searchParams);

    Object.entries(changes).forEach(([key, value]) => {
      if (value === null) {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    });
    setSearchParams(next);
  };

  return (
    <div className="page">
      <h1>{title} page</h1>
      {isLoading && <Loader />}
      {!isLoading && hasError && (
        <div>
          <p>Something went wrong</p>
          <button type="button" onClick={loadProducts}>
            Reload
          </button>
        </div>
      )}
      {!isLoading && !hasError && products.length === 0 && (
        <p>There are no {title.toLowerCase()} yet</p>
      )}
      {!isLoading && !hasError && products.length > 0 && (
        <>
          <div className="catalog-controls">
            <input
              type="search"
              value={query}
              placeholder="Search"
              onChange={event =>
                changeParams({ query: event.target.value || null, page: null })
              }
            />
            <label>
              Sort by{' '}
              <select
                value={sort}
                onChange={event =>
                  changeParams({
                    sort:
                      event.target.value === 'age' ? null : event.target.value,
                    page: null,
                  })
                }
              >
                <option value="age">Newest</option>
                <option value="title">Alphabetically</option>
                <option value="price">Cheapest</option>
              </select>
            </label>
            {filteredProducts.length > 4 && (
              <label>
                Items on page{' '}
                <select
                  value={perPage}
                  onChange={event =>
                    changeParams({
                      perPage:
                        event.target.value === 'all'
                          ? null
                          : event.target.value,
                      page: null,
                    })
                  }
                >
                  <option value="4">4</option>
                  <option value="8">8</option>
                  <option value="16">16</option>
                  <option value="all">all</option>
                </select>
              </label>
            )}
          </div>
          {filteredProducts.length ? (
            <ProductsList products={shownProducts} />
          ) : (
            <p>There are no {title.toLowerCase()} matching the query</p>
          )}
          {pageCount > 1 && (
            <nav className="pagination" aria-label="Pagination">
              {Array.from({ length: pageCount }, (_, index) => index + 1).map(
                number => (
                  <button
                    type="button"
                    className={number === page ? 'active' : ''}
                    key={number}
                    onClick={() =>
                      changeParams({
                        page: number === 1 ? null : String(number),
                      })
                    }
                  >
                    {number}
                  </button>
                ),
              )}
            </nav>
          )}
        </>
      )}
    </div>
  );
};
