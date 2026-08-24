import styles from './accessories.module.scss';

import { ProductNavigation } from '../../components/ProductNavigation';
import { useProducts } from '../../hooks/usePoducts';
import { usePagination } from '../../hooks/usePagination';
import { Dropdowns } from '../../components/Dropdowns/Dropdowns';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Pagination } from '../../components/Pagination/Pagination';
import { Loader } from '../../components/Loader';

import { itemsOptions } from '../../types/itemsOptions';
import { sortOptions } from '../../types/sortOptions';
import { usePaginationScroll } from '../../hooks/usePaginationScroll';

export const Accessories = () => {
  const {
    products: accessories,
    sortedProducts,
    sortBy,
    setSortBy,
    itemsPerPage,
    setItemsPerPage,
    perPage,
    currentPage,
    setCurrentPage,
    loading,
    error,
  } = useProducts('accessories');

  const { catalogRef, scrollToCatalog } = usePaginationScroll();

  const { totalPages, visibleItems: accessoriesPage } = usePagination({
    items: sortedProducts,
    itemsPerPage: perPage,
    currentPage,
  });

  const goToPage = (page: number) => {
    setCurrentPage(page);
    scrollToCatalog();
  };

  const lengthAccessories = accessories.length;

  return (
    <div className={styles.accessories}>
      {loading && <Loader />}

      {error && (
        <div>
          <p>Something went wrong</p>

          <button type="button" onClick={() => window.location.reload()}>
            Reload
          </button>
        </div>
      )}

      {!loading && !error && accessories.length === 0 && (
        <p>There are no phones yet</p>
      )}

      {!loading && !error && accessories.length > 0 && (
        <div className={styles.accessories__navigation}>
          <ProductNavigation />

          <div ref={catalogRef}>
            <h1 className={styles.accessories__title}>Accessories</h1>
            <p className={styles.accessories__length}>
              {lengthAccessories} models
            </p>
          </div>

          <div>
            <div className={styles.dropdowns}>
              <Dropdowns
                title="Sort by"
                options={sortOptions}
                value={sortBy}
                onChange={setSortBy}
              />

              <Dropdowns
                title="Items on page"
                options={itemsOptions}
                value={itemsPerPage}
                onChange={setItemsPerPage}
              />
            </div>

            <div className={styles.catalog}>
              {accessoriesPage.map(accessory => (
                <div key={accessory.id} className={styles.catalog__item}>
                  <ProductCard item={accessory} />
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                goToPage={goToPage}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
