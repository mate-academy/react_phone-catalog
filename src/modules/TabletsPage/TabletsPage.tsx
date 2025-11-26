import styles from './TabletsPage.module.scss';
import { ProductsList } from '../../shared/components/ProductList/ProductsList';
import { Loader } from '../../shared/components/Loader/Loader';
import { getTabletsFromProducts } from '../../services/productsService';
import { Pagination } from '../../shared/components/Pagination';
import { useProductsPage } from '../../shared/hooks/useProductPage';
import { ProductsControls } from '../../shared/components/ProductsControls';

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

      <ProductsControls
        sortBy={sortBy}
        setSortBy={setSortBy}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
      />

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
