import styles from './PhonesPage.module.scss';
import { ProductsList } from '../../shared/components/ProductList/ProductsList';
import { Loader } from '../../shared/components/Loader/Loader';
import { getPhonesFromProducts } from '../../services/productsService';
import { Pagination } from '../../shared/components/Pagination';
import { useProductsPage } from '../../shared/hooks/useProductPage';
import { ProductsControls } from '../../shared/components/ProductsControls';
import { LocationIndicator } from '../../shared/LocationIndicator';

export const PhonesPage = () => {
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
  } = useProductsPage({ fetchFn: getPhonesFromProducts });

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
    return <p className={styles.message}>There are no phones yet</p>;
  }

  return (
    <>
      <div className={`container ${styles.phonesPage}`}>
        <LocationIndicator category={'Phones'} />
        <h1>Mobile Phones</h1>

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
    </>
  );
};
