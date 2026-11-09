import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Select } from '../../components/Select/Select';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import TabletData from '../../../public/api/accessories.json';
import styles from './Accessories.module.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';

const sortOptions = [
  { value: 'age', label: 'Newest' },
  { value: 'title', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

const perPageOptions = [
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
  { value: 'all', label: 'All' },
];

const MODEL_YEARS: Record<string, number> = {
  'apple-watch-series-3': 2017,
  'apple-watch-series-5': 2019,
  'apple-watch-series-6': 2020,
};

const getProductYear = (product: { namespaceId: string }) => {
  return MODEL_YEARS[product.namespaceId] ?? 0;
};

export const AccessoriesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = searchParams.get('page');
  const sortBy = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || 'all';

  const currentPage = pageParam ? Number(pageParam) : 1;

  const handleSortChange = (newSort: string) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);

      if (newSort === 'age') {
        newParams.delete('sort');
      } else {
        newParams.set('sort', newSort);
      }

      newParams.delete('page');

      return newParams;
    });
  };

  const handlePerPageChange = (newPerPage: string) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);

      if (newPerPage === 'all') {
        newParams.delete('perPage');
      } else {
        newParams.set('perPage', newPerPage);
      }

      newParams.delete('page');

      return newParams;
    });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);

      if (newPage === 1) {
        newParams.delete('page');
      } else {
        newParams.set('page', newPage.toString());
      }

      return newParams;
    });
  };

  const sortedProducts = useMemo(() => {
    return [...TabletData].sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.priceDiscount - b.priceDiscount;
        case 'age':
        default:
          return getProductYear(b) - getProductYear(a);
      }
    });
  }, [sortBy]);

  const itemsPerPage =
    perPage === 'all' ? sortedProducts.length : Number(perPage);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const visiblePages = useMemo(() => {
    const maxVisible = 4;
    let start = 1;
    let end = totalPages;

    if (totalPages > maxVisible) {
      const half = Math.floor(maxVisible / 2);

      if (currentPage <= half) {
        start = 1;
        end = maxVisible;
      } else if (currentPage + half >= totalPages) {
        start = totalPages - maxVisible + 1;
        end = totalPages;
      } else {
        start = currentPage - half;
        end = start + maxVisible - 1;
      }
    }

    const pages = [];

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }, [currentPage, totalPages]);

  const visibleProducts = useMemo(() => {
    if (perPage === 'all') {
      return sortedProducts;
    }

    const start = (currentPage - 1) * itemsPerPage;

    return sortedProducts.slice(start, start + itemsPerPage);
  }, [sortedProducts, perPage, currentPage, itemsPerPage]);

  return (
    <div className={styles.container}>
      <Breadcrumbs />

      <h1 className={styles.pageTitle}>Tablets Page</h1>
      <p className={styles.modelsCount}>{TabletData.length} models</p>

      <div className={styles.dropdowns}>
        <div className={styles.dropdownGroup}>
          <span className={styles.label}>Sort by</span>
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={handleSortChange}
          />
        </div>

        <div className={styles.dropdownGroup}>
          <span className={styles.label}>Items on page</span>
          <Select
            options={perPageOptions}
            value={perPage}
            onChange={handlePerPageChange}
          />
        </div>
      </div>

      <ProductsList products={visibleProducts} />

      {perPage !== 'all' && totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            type="button"
            className={`${styles.paginationArrow} ${
              currentPage === 1 ? styles.disabled : ''
            }`}
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <img src="./img/icons/slider/slider-arrow-left.svg" alt="Left" />
          </button>

          {visiblePages.map(pageNum => (
            <button
              key={pageNum}
              type="button"
              className={`${styles.paginationButton} ${
                currentPage === pageNum ? styles.active : ''
              }`}
              onClick={() => handlePageChange(pageNum)}
            >
              {pageNum}
            </button>
          ))}

          <button
            type="button"
            className={`${styles.paginationArrow} ${
              currentPage === totalPages ? styles.disabled : ''
            }`}
            onClick={() =>
              currentPage < totalPages && handlePageChange(currentPage + 1)
            }
            disabled={currentPage === totalPages}
          >
            <img src="./img/icons/slider/slider-arrow-right.svg" alt="Right" />
          </button>
        </div>
      )}
    </div>
  );
};
