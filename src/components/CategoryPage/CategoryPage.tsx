import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../Breadcrumbs';
import { Loader } from '../Loader';
import { Pagination } from '../Pagination';
import { ProductsList } from '../ProductsList';
import type { Product } from '../../types/Product';
import { sortProducts } from '../../utils/sortProducts';
import styles from './CategoryPage.module.scss';

interface Props {
  category: string;
  title: string;
  crumb: string;
}

export const CategoryPage = ({ category, title, crumb }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || 'age';
  const perPage = Number(searchParams.get('perPage')) || 0;
  const page = Number(searchParams.get('page')) || 1;

  const sortedProducts = sortProducts(products, sort);
  const itemsPerPage = perPage || sortedProducts.length;
  const pagesCount = itemsPerPage
    ? Math.ceil(sortedProducts.length / itemsPerPage)
    : 0;
  const currentPage = Math.min(Math.max(page, 1), pagesCount || 1);
  const start = (currentPage - 1) * itemsPerPage;
  const visibleProducts = sortedProducts.slice(start, start + itemsPerPage);

  const isReady = !isLoading && !hasError && products.length > 0;

  useEffect(() => {
    fetch('api/products.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load products');
        }

        return response.json();
      })
      .then((data: Product[]) => {
        setProducts(data.filter(product => product.category === category));
      })

      .catch(() => setHasError(true))

      .finally(() => setIsLoading(false));
  }, [category]);

  const updateParams = (changes: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(changes).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    setSearchParams(params);
  };

  const handleSortChange = (value: string) => {
    updateParams({ sort: value, page: null });
  };

  const handlePerPageChange = (value: string) => {
    updateParams({ perPage: value === 'all' ? null : value, page: null });
  };

  const handlePageChange = (newPage: number) => {
    updateParams({ page: newPage === 1 ? null : String(newPage) });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.page}>
      <Breadcrumbs crumbs={[{ label: crumb }]} />

      <h1 className={styles.title}>{title}</h1>

      {isLoading && <Loader />}

      {hasError && (
        <div className={styles.message}>
          <p>Something went wrong</p>

          <button
            type="button"
            className={styles.reload}
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      )}

      {!isLoading && !hasError && products.length === 0 && (
        <p className={styles.message}>There are no {category} yet</p>
      )}

      {isReady && (
        <>
          <p className={styles.count}>{products.length} models</p>

          <div className={styles.controls}>
            <div className={styles.control}>
              <label htmlFor="sort" className={styles.label}>
                Sort by
              </label>

              <div className={styles.selectWrap}>
                <select
                  id="sort"
                  className={styles.select}
                  value={sort}
                  onChange={event => handleSortChange(event.target.value)}
                >
                  <option value="age">Newest</option>
                  <option value="title">Alphabetically</option>
                  <option value="price">Cheapest</option>
                </select>

                <img
                  className={styles.selectArrow}
                  src="img/icons/arrow-right.svg"
                  alt=""
                  width="16"
                  height="16"
                />
              </div>
            </div>

            <div className={styles.control}>
              <label htmlFor="perPage" className={styles.label}>
                Items on page
              </label>

              <div className={`${styles.selectWrap} ${styles.selectWrapSmall}`}>
                <select
                  id="perPage"
                  className={styles.select}
                  value={perPage ? String(perPage) : 'all'}
                  onChange={event => handlePerPageChange(event.target.value)}
                >
                  <option value="4">4</option>
                  <option value="8">8</option>
                  <option value="16">16</option>
                  <option value="all">all</option>
                </select>

                <img
                  className={styles.selectArrow}
                  src="img/icons/arrow-right.svg"
                  alt=""
                  width="16"
                  height="16"
                />
              </div>
            </div>
          </div>

          <ProductsList products={visibleProducts} />

          <Pagination
            pagesCount={pagesCount}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};
