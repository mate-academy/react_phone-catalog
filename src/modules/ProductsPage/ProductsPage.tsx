import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { ProductList } from '../../components/ProductList';
import { getProductsByCategory } from '../../services/api';
import { Category, Product } from '../../types/catalog';
import { categoryEmptyLabels, categoryLabels } from '../../utils/category';
import styles from './ProductsPage.module.scss';

type SortBy = 'age' | 'title' | 'price';
type PerPage = '4' | '8' | '16' | 'all';
const sortOptions: SortBy[] = ['age', 'title', 'price'];
const perPageOptions: PerPage[] = ['4', '8', '16', 'all'];

const sortProducts = (products: Product[], sortBy: SortBy) => {
  const copy = [...products];

  if (sortBy === 'title') {
    return copy.sort((first, second) => first.name.localeCompare(second.name));
  }

  if (sortBy === 'price') {
    return copy.sort((first, second) => first.price - second.price);
  }

  return copy.sort((first, second) => second.year - first.year);
};

const getSortBy = (value: string | null): SortBy =>
  sortOptions.includes(value as SortBy) ? (value as SortBy) : 'age';

const getPerPage = (value: string | null): PerPage =>
  perPageOptions.includes(value as PerPage) ? (value as PerPage) : 'all';

const getPage = (value: string | null) => {
  const parsedPage = Number(value);

  return Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
};

export const ProductsPage = ({ category }: { category: Category }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setError(false);
    setLoading(true);

    getProductsByCategory(category)
      .then(setProducts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [category]);

  const sortBy = getSortBy(searchParams.get('sort'));
  const perPage = getPerPage(searchParams.get('perPage'));
  const page = getPage(searchParams.get('page'));

  const sortedProducts = useMemo(
    () => sortProducts(products, sortBy),
    [products, sortBy],
  );

  const itemsPerPage =
    perPage === 'all' ? sortedProducts.length : Number(perPage);
  const totalPages =
    itemsPerPage > 0 ? Math.ceil(sortedProducts.length / itemsPerPage) : 1;
  const safePage = Math.min(Math.max(page, 1), Math.max(totalPages, 1));

  const visibleProducts =
    itemsPerPage > 0
      ? sortedProducts.slice(
          (safePage - 1) * itemsPerPage,
          safePage * itemsPerPage,
        )
      : sortedProducts;

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextParams = new URLSearchParams(searchParams);
    const value = event.target.value;

    if (value === 'age') {
      nextParams.delete('sort');
    } else {
      nextParams.set('sort', value);
    }

    nextParams.delete('page');
    setSearchParams(nextParams);
  };

  const handlePerPageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextParams = new URLSearchParams(searchParams);
    const value = event.target.value;

    if (value === 'all') {
      nextParams.delete('perPage');
    } else {
      nextParams.set('perPage', value);
    }

    nextParams.delete('page');
    setSearchParams(nextParams);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div>
        <p>Something went wrong.</p>
        <button type="button" onClick={() => window.location.reload()}>
          Reload
        </button>
      </div>
    );
  }

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <div className={styles.titleBlock}>
          <h1 className={styles.title}>{categoryLabels[category]}</h1>
          <p className={styles.count}>
            {products.length} {categoryLabels[category].toLowerCase()}
          </p>
        </div>

        <div className={styles.controls}>
          <label className={styles.control}>
            <span className={styles.controlLabel}>Sort by</span>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className={styles.select}
            >
              <option value="age">Newest</option>
              <option value="title">Alphabetically</option>
              <option value="price">Cheapest</option>
            </select>
          </label>

          <label className={styles.control}>
            <span className={styles.controlLabel}>Items on page</span>
            <select
              value={perPage}
              onChange={handlePerPageChange}
              className={styles.select}
            >
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="all">all</option>
            </select>
          </label>
        </div>
      </div>

      {products.length === 0 ? (
        <p>{categoryEmptyLabels[category]}</p>
      ) : (
        <>
          <ProductList products={visibleProducts} />

          {totalPages > 1 && (
            <div className={styles.pagination}>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                currentPage => (
                  <button
                    type="button"
                    key={currentPage}
                    className={`${styles.pageButton} ${
                      currentPage === safePage ? styles.active : ''
                    }`.trim()}
                    onClick={() => {
                      const nextParams = new URLSearchParams(searchParams);

                      if (currentPage === 1) {
                        nextParams.delete('page');
                      } else {
                        nextParams.set('page', String(currentPage));
                      }

                      setSearchParams(nextParams);
                    }}
                  >
                    {currentPage}
                  </button>
                ),
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
};
