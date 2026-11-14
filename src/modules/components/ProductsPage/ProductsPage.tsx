import { useMemo } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { ProductList } from '../ProductList/ProductList';
import styles from './ProductsPage.module.scss';
import { Pagination } from '../Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../Loader/Loader';

type Category = 'phones' | 'tablets' | 'accessories';
type SortType = 'Newest' | 'Alphabetically' | 'Cheapest';
type PerPageOption = '4' | '8' | '16' | 'all';

type Props = {
  category: Category;
};

export const ProductsPage = ({ category }: Props) => {
  const { products, isLoading, hasError, loadProducts } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const sortParam = searchParams.get('sort');
  const perPageParam = searchParams.get('perPage');

  const sortBy: SortType =
    sortParam === 'Alphabetically' || sortParam === 'Cheapest'
      ? sortParam
      : 'Newest';

  const perPage: PerPageOption =
    perPageParam === '4' || perPageParam === '8' || perPageParam === '16'
      ? perPageParam
      : 'all';

  const requestedPage = Number(searchParams.get('page')) || 1;

  const updateParams = (updates: Record<string, string | null>) => {
    const next = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    });

    setSearchParams(next);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    updateParams({
      sort: value === 'Newest' ? null : value,
      page: null,
    });
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    updateParams({
      perPage: value === 'all' ? null : value,
      page: null,
    });
  };

  const handlePageChange = (pageNumber: number) => {
    updateParams({
      page: pageNumber === 1 ? null : String(pageNumber),
    });
  };

  const filteredProducts = useMemo(
    () => products.filter(product => product.category === category),
    [products, category],
  );

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case 'Alphabetically':
          return a.name.localeCompare(b.name);

        case 'Cheapest':
          return a.price - b.price;

        case 'Newest':
        default:
          return b.year - a.year;
      }
    });
  }, [filteredProducts, sortBy]);

  const total = sortedProducts.length;

  const itemsPerPage = perPage === 'all' ? total : Number(perPage);

  const pageCount = itemsPerPage > 0 ? Math.ceil(total / itemsPerPage) : 1;

  const currentPage = Math.min(Math.max(requestedPage, 1), pageCount);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const visibleProducts = useMemo(() => {
    if (perPage === 'all') {
      return sortedProducts;
    }

    return sortedProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedProducts, startIndex, itemsPerPage, perPage]);

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>
        {category === 'phones'
          ? 'Phones page'
          : category === 'tablets'
            ? 'Tablets page'
            : 'Accessories page'}
      </h1>

      <p className={styles.count}>{filteredProducts.length} models</p>

      <div className={styles.controls}>
        <label className={styles.sort}>
          <span>Sort by:</span>

          <select value={sortBy} onChange={handleSortChange}>
            <option value="Newest">Newest</option>
            <option value="Alphabetically">Alphabetically</option>
            <option value="Cheapest">Cheapest</option>
          </select>
        </label>

        <label className={styles.sort}>
          <span>Items on page:</span>

          <select value={perPage} onChange={handlePerPageChange}>
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="all">All</option>
          </select>
        </label>
      </div>

      {isLoading && <Loader />}

      {!isLoading && hasError && (
        <div className={styles.error}>
          <p>Something went wrong</p>
          <button type="button" onClick={loadProducts}>
            Reload
          </button>
        </div>
      )}

      {!isLoading && !hasError && total === 0 && (
        <p className={styles.empty}>There are no products yet</p>
      )}

      {!isLoading && !hasError && total > 0 && (
        <>
          <ProductList products={visibleProducts} />

          {pageCount > 1 && (
            <Pagination
              total={pageCount}
              current={currentPage}
              onChange={handlePageChange}
            />
          )}
        </>
      )}
    </section>
  );
};
