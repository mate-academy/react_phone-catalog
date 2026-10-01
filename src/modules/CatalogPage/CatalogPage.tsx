/* eslint-disable @typescript-eslint/indent */
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getProducts } from '../../api/products';
import { Category, Product } from '../../types/Product';
import { ProductsList } from '../../components/ProductsList';
import { Loader } from '../../components/Loader';
import { StatusMessage } from '../../components/StatusMessage';
import { Icon } from '../../components/Icon/Icon';
import styles from './CatalogPage.module.scss';

type Props = {
  category: Category;
};

const categoryTitles: Record<Category, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

type SortValue = 'age' | 'title' | 'price';

const sortProducts = (products: Product[], sort: SortValue): Product[] => {
  const sorted = [...products];

  switch (sort) {
    case 'age':
      return sorted.sort((a, b) => b.year - a.year);
    case 'title':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'price':
      return sorted.sort((a, b) => a.price - b.price);
    default:
      return sorted;
  }
};

const getPageNumbers = (
  current: number,
  total: number,
): (number | 'dots')[] => {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (current <= 4) {
    return [1, 2, 3, 4, 5, 'dots', total];
  }

  if (current >= total - 3) {
    return [1, 'dots', total - 4, total - 3, total - 2, total - 1, total];
  }

  return [1, 'dots', current - 1, current, current + 1, 'dots', total];
};

export const CatalogPage = ({ category }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = (searchParams.get('sort') as SortValue) || 'age';
  const query = searchParams.get('query') || '';
  const page = Number(searchParams.get('page')) || 1;
  const perPageParam = searchParams.get('perPage') || 'all';

  const loadProducts = () => {
    setIsLoading(true);
    setHasError(false);

    getProducts()
      .then(data => {
        setProducts(data.filter(p => p.category === category));
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()),
  );

  const sortedProducts = sortProducts(filteredProducts, sort);
  const perPage =
    perPageParam === 'all' ? sortedProducts.length : Number(perPageParam);
  const totalPages =
    perPage > 0 ? Math.ceil(sortedProducts.length / perPage) : 1;
  const startIndex = (page - 1) * perPage;
  const visibleProducts = sortedProducts.slice(
    startIndex,
    startIndex + perPage,
  );

  const updateParam = (key: string, value: string, defaultValue: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (value === defaultValue) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }

    newParams.delete('page'); // скидаємо сторінку при зміні сортування/розміру

    setSearchParams(newParams);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateParam('sort', event.target.value, 'age');
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateParam('perPage', event.target.value, 'all');
  };

  const goToPage = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);

    if (newPage === 1) {
      newParams.delete('page');
    } else {
      newParams.set('page', String(newPage));
    }

    setSearchParams(newParams);
  };

  return (
    <div className="container">
      <nav className={styles.breadcrumbs} aria-label="Breadcrumbs">
        <Link to="/" className={styles.breadcrumbHome}>
          <Icon name="home" />
        </Link>
        <Icon name="chevronRight" className={styles.breadcrumbSeparator} />
        <span className={styles.breadcrumbCurrent}>
          {categoryTitles[category]}
        </span>
      </nav>

      <h1 className={styles.title}>{categoryTitles[category]}</h1>

      {!isLoading && !hasError && (
        <p className={styles.count}>{products.length} models</p>
      )}

      {isLoading && <Loader />}

      {!isLoading && hasError && (
        <StatusMessage message="Something went wrong" onReload={loadProducts} />
      )}

      {!isLoading && !hasError && products.length === 0 && (
        <StatusMessage message={`There are no ${category} yet`} />
      )}

      {!isLoading &&
        !hasError &&
        products.length > 0 &&
        filteredProducts.length === 0 && (
          <StatusMessage
            message={`There are no ${category} matching the query`}
          />
        )}

      {!isLoading && !hasError && filteredProducts.length > 0 && (
        <>
          <div className={styles.controls}>
            <label className={styles.control}>
              <span className={styles.controlLabel}>Sort by</span>
              <select
                className={styles.select}
                value={sort}
                onChange={handleSortChange}
              >
                <option value="age">Newest</option>
                <option value="title">Alphabetically</option>
                <option value="price">Cheapest</option>
              </select>
            </label>

            <label className={styles.control}>
              <span className={styles.controlLabel}>Items on page</span>
              <select
                className={styles.select}
                value={perPageParam}
                onChange={handlePerPageChange}
              >
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="16">16</option>
                <option value="all">All</option>
              </select>
            </label>
          </div>

          <ProductsList products={visibleProducts} />

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                type="button"
                className={styles.pageArrow}
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
                aria-label="Previous page"
              >
                <Icon name="chevronLeft" />
              </button>

              {getPageNumbers(page, totalPages).map((p, index) =>
                p === 'dots' ? (
                  <span key={`dots-${index}`} className={styles.pageDots}>
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    type="button"
                    className={`${styles.pageButton} ${
                      p === page ? styles.pageButtonActive : ''
                    }`}
                    onClick={() => goToPage(p)}
                  >
                    {p}
                  </button>
                ),
              )}

              <button
                type="button"
                className={styles.pageArrow}
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages}
                aria-label="Next page"
              >
                <Icon name="chevronRight" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
