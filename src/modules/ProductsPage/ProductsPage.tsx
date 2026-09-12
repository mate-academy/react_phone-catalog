import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Category, Product } from '../../types/Product';
import { getProductsByCategory } from '../../api/products';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
} from '../shared/components/Icons/Icons';
import { Loader } from '../shared/components/Loader';
import { ProductsList } from '../shared/components/ProductsList';

type Props = {
  category: Category;
  /** Page heading, e.g. "Mobile phones" — the wording used in the design. */
  title: string;
  /** Short name for breadcrumbs and empty states, e.g. "Phones". */
  label: string;
};

/** Matches the catalog layout in Figma: four rows of four cards. */
const DEFAULT_PER_PAGE = '16';

const getPaginationRange = (
  current: number,
  total: number,
): (number | '...')[] => {
  const delta = 1;
  const left = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);
  const range: (number | '...')[] = [1];

  if (left > 2) {
    range.push('...');
  }

  for (let i = left; i <= right; i++) {
    range.push(i);
  }

  if (right < total - 1) {
    range.push('...');
  }

  if (total > 1) {
    range.push(total);
  }

  return range;
};

export const ProductsPage = ({ category, title, label }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // The URL is the single source of truth: the header Search writes ?query
  // into it, so the page must read the params rather than mirror them.
  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || DEFAULT_PER_PAGE;
  const page = Math.max(1, Number(searchParams.get('page')) || 1);

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
  const safePage = Math.min(page, Math.max(1, pageCount));
  const shownProducts = filteredProducts.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
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
      <Breadcrumbs items={[{ label }]} />

      <h1 className="page__title">{title}</h1>
      {!isLoading && !hasError && products.length > 0 && (
        <p className="page__count">{products.length} models</p>
      )}
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
        <p>There are no {label.toLowerCase()} yet</p>
      )}
      {!isLoading && !hasError && products.length > 0 && (
        <>
          <div className="catalog-controls">
            <label className="catalog-controls__sort">
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
                        event.target.value === DEFAULT_PER_PAGE
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
            <p>There are no {label.toLowerCase()} matching the query</p>
          )}
          {pageCount > 1 && (
            <nav className="pagination" aria-label="Pagination">
              <button
                type="button"
                aria-label="Previous page"
                disabled={safePage === 1}
                onClick={() =>
                  changeParams({
                    page: safePage - 1 === 1 ? null : String(safePage - 1),
                  })
                }
              >
                <ArrowLeftIcon size={14} />
              </button>

              {getPaginationRange(safePage, pageCount).map((item, index) =>
                item === '...' ? (
                  <span className="pagination__dots" key={`dots-${index}`}>
                    …
                  </span>
                ) : (
                  <button
                    type="button"
                    className={item === safePage ? 'active' : ''}
                    key={item}
                    onClick={() =>
                      changeParams({
                        page: item === 1 ? null : String(item),
                      })
                    }
                  >
                    {item}
                  </button>
                ),
              )}

              <button
                type="button"
                aria-label="Next page"
                disabled={safePage === pageCount}
                onClick={() => changeParams({ page: String(safePage + 1) })}
              >
                <ArrowRightIcon size={14} />
              </button>
            </nav>
          )}
        </>
      )}
    </div>
  );
};
