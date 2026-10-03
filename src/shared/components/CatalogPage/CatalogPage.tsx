import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { getProducts } from '../../api/products';
import { ProductsList } from '../../components/ProductsList';
import { Loader } from '../../components/Loader';
import { ErrorMessage } from '../../components/ErrorMessage';
import { getSearchWith } from '../../utils/SearchParams';
import styles from './CatalogPage.module.scss';
import { Breadcrumbs } from '../Breadcrumbs';

interface Props {
  title: string;
  category: string;
}

const SORT_OPTIONS = [
  { value: 'age', label: 'Newest' },
  { value: 'title', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

const PER_PAGE_OPTIONS = [
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
  { value: 'all', label: 'all' },
];

export const CatalogPage: React.FC<Props> = ({ title, category }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isPerPageOpen, setIsPerPageOpen] = useState(false);

  const sortRef = useRef<HTMLDivElement>(null);
  const perPageRef = useRef<HTMLDivElement>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || 'age';
  const perPageParam = searchParams.get('perPage') || 'all';
  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsSortOpen(false);
      }

      if (
        perPageRef.current &&
        !perPageRef.current.contains(e.target as Node)
      ) {
        setIsPerPageOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const loadProducts = () => {
    setLoading(true);
    setHasError(false);

    getProducts()
      .then(data => {
        const filtered = data.filter(item => item.category === category);

        setProducts(filtered);
      })
      .catch(() => setHasError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProducts();
  }, [category]);

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.price - b.price;
        case 'age':
        default:
          return b.year - a.year;
      }
    });
  }, [products, sortBy]);

  const perPage =
    perPageParam === 'all' ? sortedProducts.length : Number(perPageParam);
  const totalPages = Math.ceil(sortedProducts.length / perPage);

  const visibleProducts = useMemo(() => {
    if (perPageParam === 'all') {
      return sortedProducts;
    }

    const start = (currentPage - 1) * perPage;

    return sortedProducts.slice(start, start + perPage);
  }, [sortedProducts, currentPage, perPage, perPageParam]);

  const handleSortSelect = (val: string) => {
    setSearchParams(
      getSearchWith(searchParams, {
        sort: val === 'age' ? null : val,
        page: null,
      }),
    );
    setIsSortOpen(false);
  };

  const handlePerPageSelect = (val: string) => {
    setSearchParams(
      getSearchWith(searchParams, {
        perPage: val === 'all' ? null : val,
        page: null,
      }),
    );
    setIsPerPageOpen(false);
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams(
      getSearchWith(searchParams, {
        page: newPage === 1 ? null : String(newPage),
      }),
    );
  };

  const currentSortLabel =
    SORT_OPTIONS.find(opt => opt.value === sortBy)?.label || 'Newest';

  const visiblePages = useMemo(() => {
    const maxVisible = 4;
    let start = Math.max(1, currentPage - 1);
    let end = start + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }

    const pages = [];

    for (let i = start; i <= end; i += 1) {
      pages.push(i);
    }

    return pages;
  }, [currentPage, totalPages]);

  return (
    <div className={styles.container}>
      <Breadcrumbs category={category} />
      <h1 className={styles.title}>{title}</h1>

      {loading && <Loader />}

      {hasError && !loading && <ErrorMessage onReload={loadProducts} />}

      {!loading && !hasError && products.length === 0 && (
        <p className={styles.empty}>There are no {title.toLowerCase()} yet</p>
      )}

      {!loading && !hasError && products.length > 0 && (
        <>
          <p className={styles.count}>{products.length} models</p>

          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              <span className={styles.label}>Sort by</span>

              <div className={styles.selectWrapper} ref={sortRef}>
                <button
                  type="button"
                  className={`${styles.selectButton} ${isSortOpen ? styles.selectButtonActive : ''}`}
                  onClick={() => setIsSortOpen(prev => !prev)}
                >
                  <span>{currentSortLabel}</span>
                  <img
                    src="img/icons/Chevron (Arrow Down).svg"
                    alt=""
                    className={`${styles.selectArrow} ${isSortOpen ? styles.selectArrowOpen : ''}`}
                  />
                </button>

                {isSortOpen && (
                  <ul className={styles.dropdownMenu}>
                    {SORT_OPTIONS.map(opt => (
                      <li key={opt.value}>
                        <button
                          type="button"
                          className={`${styles.dropdownItem} ${opt.value === sortBy ? styles.dropdownItemSelected : ''}`}
                          onClick={() => handleSortSelect(opt.value)}
                        >
                          {opt.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className={styles.filterGroup}>
              <span className={styles.label}>Items on page</span>

              <div className={styles.selectWrapper} ref={perPageRef}>
                <button
                  type="button"
                  className={`${styles.selectButton} ${isPerPageOpen ? styles.selectButtonActive : ''}`}
                  onClick={() => setIsPerPageOpen(prev => !prev)}
                >
                  <span>{perPageParam}</span>
                  <img
                    src="img/icons/Chevron (Arrow Down).svg"
                    alt=""
                    className={`${styles.selectArrow} ${isPerPageOpen ? styles.selectArrowOpen : ''}`}
                  />
                </button>

                {isPerPageOpen && (
                  <ul className={styles.dropdownMenu}>
                    {PER_PAGE_OPTIONS.map(opt => (
                      <li key={opt.value}>
                        <button
                          type="button"
                          className={`${styles.dropdownItem} ${opt.value === perPageParam ? styles.dropdownItemSelected : ''}`}
                          onClick={() => handlePerPageSelect(opt.value)}
                        >
                          {opt.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <ProductsList products={visibleProducts} />

          {perPageParam !== 'all' && totalPages > 1 && (
            <div className={styles.pagination}>
              {perPageParam !== 'all' && totalPages > 1 && (
                <div className={styles.pagination}>
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={styles.pageBtn}
                  >
                    <img
                      src="img/icons/Chevron (Arrow Left).svg"
                      alt="Previous page"
                      className={styles.pageIcon}
                    />
                  </button>

                  {visiblePages.map(p => (
                    <button
                      key={p}
                      type="button"
                      className={`${styles.pageBtn} ${p === currentPage ? styles.active : ''}`}
                      onClick={() => handlePageChange(p)}
                    >
                      {p}
                    </button>
                  ))}

                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={styles.pageBtn}
                  >
                    <img
                      src="img/icons/Chevron (Arrow Right).svg"
                      alt="Next page"
                      className={styles.pageIcon}
                    />
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
