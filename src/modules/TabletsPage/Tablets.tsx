import styles from './tablets.module.scss';

import { ProductNavigation } from '../../components/ProductNavigation';
import { useProducts } from '../../hooks/usePoducts';
import { usePagination } from '../../hooks/usePagination';
import { Dropdowns } from '../../components/Dropdowns/Dropdowns';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Pagination } from '../../components/Pagination/Pagination';
import { Loader } from '../../components/Loader';

import { sortOptions } from '../../types/sortOptions';
import { itemsOptions } from '../../types/itemsOptions';
import { usePaginationScroll } from '../../hooks/usePaginationScroll';

export const Tablets = () => {
  const {
    products: tablets,
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
  } = useProducts('tablets');

  const { catalogRef, scrollToCatalog } = usePaginationScroll();

  const { totalPages, visibleItems: tabletsPage } = usePagination({
    items: sortedProducts,
    itemsPerPage: perPage,
    currentPage,
  });

  const goToPage = (page: number) => {
    setCurrentPage(page);
    scrollToCatalog();
  };

  const lengthTablets = tablets.length;

  return (
    <div className={styles.tablets}>
      {loading && <Loader />}

      {error && (
        <div>
          <p>Something went wrong</p>

          <button type="button" onClick={() => window.location.reload()}>
            Reload
          </button>
        </div>
      )}

      {!loading && !error && tablets.length === 0 && (
        <p>There are no phones yet</p>
      )}

      {!loading && !error && tablets.length > 0 && (
        <div className={styles.tablets__navigation}>
          <ProductNavigation />

          <div ref={catalogRef}>
            <h1 className={styles.tablets__title}>Tablets</h1>
            <p className={styles.tablets__length}>{lengthTablets} models</p>
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
              {tabletsPage.map(tablet => (
                <div key={tablet.id} className={styles.catalog__item}>
                  <ProductCard item={tablet} />
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
