import styles from './AccessoriesPage.module.scss';
import { ProductsList } from '../../shared/components/ProductList/ProductsList';
import { Loader } from '../../shared/components/Loader/Loader';
import { getAccessoriesFromProducts } from '../../services/productsService';
import { Pagination } from '../../shared/components/Pagination';
import { ProductsControls } from '../../shared/components/ProductsControls';
import { useProductsPage } from '../../shared/hooks/useProductPage';

export const AccessoriesPage = () => {
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
  } = useProductsPage({ fetchFn: getAccessoriesFromProducts });

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
    return <p className={styles.message}>There are no accessories yet</p>;
  }

  return (
    <div className={`container ${styles.accessoriesPage}`}>
      <h1>Accessories</h1>

      <ProductsControls
        sortBy={sortBy}
        setSortBy={setSortBy}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
      />

      <div className="grid-24">
        <ProductsList products={paginated} />
      </div>

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
