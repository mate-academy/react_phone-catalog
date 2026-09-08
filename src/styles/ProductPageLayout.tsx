import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import styles from './ProductPageLayout.module.scss';
import { ProductsList } from '../component/ProductList/ProductList';
import { Product } from '../types/Product';
import ArrowIcon from './../assets/icons/arrow-right.svg';

type Props = {
  title: string;
  products: Product[];
};

const ITEMS_PER_PAGE_OPTIONS = ['4', '8', '16', 'all'];

const sortProducts = (
  products: Product[],
  sortDirection: 'asc' | 'desc',
): Product[] => {
  if (!products || !Array.isArray(products)) {
    return [];
  }

  const sorted = [...products];

  if (sortDirection === 'asc') {
    return sorted.sort(
      (a, b) => (a.priceDiscount ?? a.price) - (b.priceDiscount ?? b.price),
    );
  }

  return sorted.sort(
    (a, b) => (b.priceDiscount ?? b.price) - (a.priceDiscount ?? b.price),
  );
};

export const ProductPageLayout: React.FC<Props> = ({ title, products }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isPerPageMenuVisible, setIsPerPageMenuVisible] = useState(false);

  const perPage = searchParams.get('perPage') || 'all';
  const currentPage = Number(searchParams.get('page')) || 1;

  const handleSortClick = () => {
    setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const handlePerPageChange = (value: string) => {
    setSearchParams(prev => {
      prev.set('perPage', value);
      prev.set('page', '1');

      return prev;
    });
    setIsPerPageMenuVisible(false);
  };

  const handlePageChange = (page: number) => {
    setSearchParams(prev => {
      prev.set('page', String(page));

      return prev;
    });
  };

  const sortedProducts = useMemo(() => {
    return sortProducts(products, sortDirection);
  }, [products, sortDirection]);

  const totalProductsCount = sortedProducts.length;
  const itemsPerPage = perPage === 'all' ? totalProductsCount : Number(perPage);
  const totalPages = Math.ceil(totalProductsCount / itemsPerPage);

  const visibleProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return sortedProducts.slice(startIndex, endIndex);
  }, [sortedProducts, itemsPerPage, currentPage]);

  const pageNumbers = useMemo(() => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return pages;
  }, [totalPages]);

  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setSearchParams(prev => {
        prev.set('page', '1');

        return prev;
      });
    }
  }, [currentPage, totalPages, setSearchParams]);

  const isListEmpty = products.length === 0;

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>{title}</h1>
        </div>

        {!isListEmpty && (
          <div className={styles.controls}>
            <div className={styles.sortControl}>
              <button
                type="button"
                onClick={handleSortClick}
                className={styles.sortButton}
              >
                <span className={styles.buttonText}>Sort price</span>
                <img
                  src={ArrowIcon}
                  alt="Sort"
                  className={classNames(styles.arrow, {
                    [styles.down]: sortDirection === 'desc',
                  })}
                />
              </button>
            </div>
            <div className={styles.perPageControl}>
              <button
                type="button"
                className={styles.perPageButton}
                onClick={() => setIsPerPageMenuVisible(prev => !prev)}
              >
                <span className={styles.currentCount}>
                  {perPage === 'all' ? 'all' : perPage}
                </span>
                <span className={styles.buttonText}>Items on page</span>
                <img
                  src={ArrowIcon}
                  alt="Expand"
                  className={classNames(styles.arrow, {
                    [styles.down]: isPerPageMenuVisible,
                  })}
                />
              </button>
              {isPerPageMenuVisible && (
                <div className={styles.perPageMenu}>
                  {ITEMS_PER_PAGE_OPTIONS.map(option => (
                    <button
                      key={option}
                      type="button"
                      className={classNames(styles.perPageMenuItem, {
                        [styles.active]: perPage === option,
                      })}
                      onClick={() => handlePerPageChange(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div className={styles.content}>
          <ProductsList products={visibleProducts} />
        </div>

        {!isListEmpty && perPage !== 'all' && totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              type="button"
              className={classNames(styles.button, {
                [styles.disabled]: !canGoPrev,
              })}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!canGoPrev}
            >
              {'<'}
            </button>
            {pageNumbers.map(page => (
              <button
                key={page}
                type="button"
                className={classNames(styles.button, {
                  [styles.active]: page === currentPage,
                })}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              className={classNames(styles.button, {
                [styles.disabled]: !canGoNext,
              })}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!canGoNext}
            >
              {'>'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
