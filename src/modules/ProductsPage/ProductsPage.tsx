import { ProductsHeader } from './components/ProductsHeader';
import { ProductsPagination } from './components/ProductsPagination';
import { ProductsList } from '../shared/components/ProductsList';
import { Loader } from '../shared/components/Loader';
import { Button } from '../shared/components/Button';
import { useProducts } from './hooks/useProducts';
import styles from './ProductsPage.module.scss';

export function ProductsPage({
  category,
}: {
  category: 'phones' | 'tablets' | 'accessories';
}): JSX.Element {
  const {
    products,
    loading,
    error,
    sort,
    page,
    perPage,
    query,
    totalPages,
    totalCount,
    showPagination,
    handleSortChange,
    handlePerPageChange,
    handlePageChange,
    handleQueryChange,
    handleRetry,
  } = useProducts(category);

  if (loading) {
    return (
      <div className={styles.container}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p className={styles.errorText}>Something went wrong</p>
          <Button variant="primary" onClick={handleRetry}>
            Reload
          </Button>
        </div>
      </div>
    );
  }

  const emptyMessage = query
    ? `There are no ${category} matching the query`
    : `There are no ${category} yet`;

  return (
    <div className={styles.container}>
      <ProductsHeader
        category={category}
        totalCount={totalCount}
        sort={sort}
        perPage={perPage}
        query={query}
        onSortChange={handleSortChange}
        onPerPageChange={handlePerPageChange}
        onQueryChange={handleQueryChange}
      />
      {products.length === 0 ? (
        <p className={styles.empty}>{emptyMessage}</p>
      ) : (
        <>
          <ProductsList products={products} className={styles.productsList} />
          <ProductsPagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            perPage={perPage}
            onPerPageChange={handlePerPageChange}
            totalCount={totalCount}
            showPagination={showPagination}
          />
        </>
      )}
    </div>
  );
}
