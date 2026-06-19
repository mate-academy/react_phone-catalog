import React, { useMemo } from 'react';
import { Accessorie } from '../../../../types/accessorie';
import { Phone } from '../../../../types/phone';
import { Tablet } from '../../../../types/tablet';
import styles from './CatalogList.module.scss';
import { Product } from '../../../../types/product';
import { usePagination } from '../../../shared/hooks/usePagination';
import { SortOption, useSort } from '../../hooks/useSort';
import { ProductList } from '../../../shared/components/ProductsList';
import { useSearchParams } from 'react-router-dom';

export type AnyProduct = Phone | Tablet | Accessorie;

type Props = {
  products: AnyProduct[];
  title: string;
};

const mapToProduct = (item: AnyProduct): Product => {
  return {
    id: item.id,
    category: item.category,
    itemId: item.id,
    name: item.name,
    fullPrice: item.priceRegular,
    price: item.priceDiscount,
    screen: item.screen,
    capacity: item.capacity,
    color: item.color,
    ram: item.ram,
    year: 'year' in item ? item.year : 0,
    image: item.images[0] || '',
  };
};

export const CatalogList: React.FC<Props> = ({ products, title }) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const { sort, setSort } = useSort();
  const { page, perPage, setPagination } = usePagination();

  const pageHeading = useMemo(() => {
    const formattedTitle =
      title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();

    return formattedTitle.endsWith('page')
      ? formattedTitle
      : `${formattedTitle} page`;
  }, [title]);

  const mappedProducts = useMemo(() => products.map(mapToProduct), [products]);

  const sortedProducts = useMemo(() => {
    const copy = [...mappedProducts];

    switch (sort) {
      case 'age':
        return copy.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
      case 'title':
        return copy.sort((a, b) => a.name.localeCompare(b.name));
      case 'price':
        return copy.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
      default:
        return copy;
    }
  }, [mappedProducts, sort]);

  const searchedProducts = useMemo(() => {
    return sortedProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [sortedProducts, query]);

  const totalPages = useMemo(() => {
    if (perPage === 'all' || perPage === 0) {
      return 1;
    }

    return Math.ceil(searchedProducts.length / perPage);
  }, [searchedProducts.length, perPage]);

  const visibleProducts = useMemo(() => {
    if (perPage === 'all') {
      return searchedProducts;
    }

    const start = (page - 1) * perPage;

    return searchedProducts.slice(start, start + perPage);
  }, [searchedProducts, page, perPage]);

  const currentProductsQuantity = products.length;

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextSort = event.target.value as SortOption;

    setSort(nextSort);
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const nextPerPage = value === 'all' ? 'all' : parseInt(value, 10);

    setPagination({ page: 1, perPage: nextPerPage });
  };

  const pageNumbers = useMemo(() => {
    const maxVisiblePages = 4;

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage === 0) {
      startPage = 1;
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index,
    );
  }, [totalPages, page]);

  return (
    <div className={styles.listWrapper}>
      <div className={styles.topBar}>
        <h1 className={styles.title}>{pageHeading}</h1>

        <div className={styles.quantity}>{currentProductsQuantity} models</div>

        <div className={styles.changes}>
          <label htmlFor="sort-select" className={styles.label}>
            <p>Sort by</p>

            <select
              id="sort-select"
              className={styles.selects}
              value={sort}
              onChange={handleSortChange}
            >
              <option value="age" className={styles.selectOptions}>
                Newest
              </option>
              <option value="title" className={styles.selectOptions}>
                Alphabetically
              </option>
              <option value="price" className={styles.selectOptions}>
                Cheapest
              </option>
            </select>
          </label>

          <label htmlFor="per-page-select" className={styles.label}>
            <p>Items on page</p>

            <select
              id="per-page-select"
              className={styles.selects}
              value={perPage}
              onChange={handlePerPageChange}
            >
              <option value="4" className={styles.selectOptions}>
                4
              </option>
              <option value="8" className={styles.selectOptions}>
                8
              </option>
              <option value="16" className={styles.selectOptions}>
                16
              </option>
              <option value="all" className={styles.selectOptions}>
                All
              </option>
            </select>
          </label>
        </div>
      </div>

      <div className={styles.listWindow}>
        {searchedProducts.length > 0 ? (
          <ProductList products={visibleProducts} />
        ) : !query ? (
          <div className={styles.emptyState}>
            <h2 className={styles.emptyStateTitle}>
              There are no {title.toLowerCase()} yet
            </h2>
            <p className={styles.emptyStateSub}>
              Please check back later or try changing your filters.
            </p>
          </div>
        ) : (
          <div className={styles.emptyState}>
            <h2 className={styles.emptyStateTitle}>
              There are no {title.toLowerCase()} matching the query
            </h2>
          </div>
        )}
      </div>

      {currentProductsQuantity > 0 && perPage !== 'all' && totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.paginationButtonArrow}
            onClick={() => setPagination({ page: page - 1 })}
            disabled={page === 1}
          >
            <img src="/img/icons/left.svg" alt="" className={styles.arrow} />
          </button>

          {pageNumbers.map(num => (
            <button
              key={num}
              className={`${styles.paginationButton} ${page === num ? styles.activePage : ''}`}
              onClick={() => setPagination({ page: num })}
            >
              {num}
            </button>
          ))}

          <button
            className={styles.paginationButtonArrow}
            onClick={() => setPagination({ page: page + 1 })}
            disabled={page === totalPages}
          >
            <img src="/img/icons/right.svg" alt="" className={styles.arrow} />
          </button>
        </div>
      )}
    </div>
  );
};
