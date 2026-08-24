import styles from './phones.module.scss';

import { ProductNavigation } from '../../components/ProductNavigation';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { usePagination } from '../../hooks/usePagination';
import { Dropdowns } from '../../components/Dropdowns/Dropdowns';
import { Pagination } from '../../components/Pagination/Pagination';
import { useProducts } from '../../hooks/usePoducts';
import { Loader } from '../../components/Loader';
import { usePaginationScroll } from '../../hooks/usePaginationScroll';

import { sortOptions } from '../../types/sortOptions';
import { itemsOptions } from '../../types/itemsOptions';

export const Phones = () => {
  const {
    products: phones,
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
  } = useProducts('phones');

  const { catalogRef, scrollToCatalog } = usePaginationScroll();

  const goToPage = (page: number) => {
    setCurrentPage(page);
    scrollToCatalog();
  };

  const { totalPages, visibleItems: phonesPage } = usePagination({
    items: sortedProducts,
    itemsPerPage: perPage,
    currentPage,
  });

  const lengthPhones = phones.length;

  return (
    <div className={styles.phones}>
      {loading && <Loader />}

      {error && (
        <div>
          <p>Something went wrong</p>

          <button type="button" onClick={() => window.location.reload()}>
            Reload
          </button>
        </div>
      )}

      {!loading && !error && phones.length === 0 && (
        <p>There are no phones yet</p>
      )}

      {!loading && !error && phones.length > 0 && (
        <div className={styles.phones__navigation}>
          <ProductNavigation />

          <div ref={catalogRef}>
            <h1 className={styles.phones__title}>Mobile phones</h1>
            <p className={styles.phones__length}>{lengthPhones} models</p>
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
              {phonesPage.map(phone => (
                <div key={phone.id} className={styles.catalog__item}>
                  <ProductCard item={phone} />
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
