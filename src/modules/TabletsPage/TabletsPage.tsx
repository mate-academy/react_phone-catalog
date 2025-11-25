import styles from './TabletsPage.module.scss';
import { ProductsList } from '../../shared/components/ProductList/ProductsList';
import { Loader } from '../../shared/components/Loader/Loader';
import { getTabletsFromProducts } from '../../services/productsService';
import { Pagination } from '../../shared/components/Pagination';
import { useProductsPage } from '../../shared/hooks/useProductPage';

import { SORT, SortBy, ITEMS_PER_PAGE_OPTIONS } from '../../shared/constants';

export const TabletsPage = () => {
  const {
    loading,
    error,

    sorted,
    sortBy,
    setSortBy,

    paginated,
    itemsPerPage,
    setItemsPerPage,

    currentPage,
    totalPages,
    handlePageChange,
  } = useProductsPage({ fetchFn: getTabletsFromProducts });

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className={styles.message}>
        <p>Something went wrong</p>
        <button onClick={() => window.location.reload()}>Reload</button>
      </div>
    );
  }

  if (!sorted.length) {
    return <p className={styles.message}>There are no tablets yet</p>;
  }

  return (
    <div className={styles.tabletsPage}>
      <h1>Tablets</h1>

      <div className={styles.controls}>
        {/* SORT SELECT */}
        <div className={styles.selectGroup}>
          <label htmlFor="sort">Sort by:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={e => setSortBy(e.target.value as SortBy)}
            className={styles.select}
          >
            <option value={SORT.NEWEST}>Newest</option>
            <option value={SORT.ALPHA}>Alphabetically</option>
            <option value={SORT.CHEAPEST}>Cheapest</option>
          </select>
        </div>

        <div className={styles.selectGroup}>
          <label htmlFor="perPage">Items on page:</label>
          <select
            id="perPage"
            value={itemsPerPage}
            onChange={event =>
              setItemsPerPage(
                event.target.value === 'all'
                  ? 'all'
                  : (Number(event.target.value) as 4 | 8 | 16),
              )
            }
            className={styles.select}
          >
            {ITEMS_PER_PAGE_OPTIONS.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ProductsList products={paginated} />

      {itemsPerPage !== 'all' && totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
