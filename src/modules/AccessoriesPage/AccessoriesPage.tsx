import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import styles from './AccessoriesPage.module.scss';
import { getAccessories, type Accessory } from '../../api/accessories';
import { Container } from '../shared/components/Container';
import { ProductCard } from '../shared/components/ProductCard';
import {
  DEFAULT_PAGE,
  DEFAULT_PER_PAGE,
  DEFAULT_SORT,
  PER_PAGE_OPTIONS,
  SORT_LABEL_MAP,
  SORT_MAP,
  SORT_OPTIONS,
  normalizePage,
  normalizePerPage,
  normalizeSort,
  type PerPage,
  type SortLabel,
  type SortParam,
} from '../shared/utils';
import { ProductCardSkeleton } from '../shared/components/Skeleton';

export const AccessoriesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sortParam: SortParam = normalizeSort(searchParams.get('sort'));
  const perPage: PerPage = normalizePerPage(searchParams.get('perPage'));
  const currentPage: number = normalizePage(searchParams.get('page'));

  const updateUrl = useCallback(
    (next: { sort?: SortParam; perPage?: PerPage; page?: number }) => {
      const params: Record<string, string> = {};

      const s = next.sort ?? sortParam;
      const p = next.perPage ?? perPage;
      const pg = next.page ?? currentPage;

      if (s !== DEFAULT_SORT) {
        params.sort = s;
      }

      if (p !== DEFAULT_PER_PAGE) {
        params.perPage = String(p);
      }

      if (pg !== DEFAULT_PAGE) {
        params.page = String(pg);
      }

      setSearchParams(params);
    },
    [sortParam, perPage, currentPage, setSearchParams],
  );

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    getAccessories()
      .then(setAccessories)
      .catch(() => setError('Failed to load accessories'))
      .finally(() => setIsLoading(false));
  }, []);

  const sortedAccessories = useMemo(() => {
    const data = [...accessories];

    if (sortParam === 'title') {
      return data.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortParam === 'price') {
      return data.sort((a, b) => a.price - b.price);
    }

    return data;
  }, [accessories, sortParam]);

  const totalItems = sortedAccessories.length;

  const totalPages =
    perPage === 'all' || totalItems === 0 ? 0 : Math.ceil(totalItems / perPage);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      updateUrl({ page: totalPages });
    }
  }, [currentPage, totalPages, updateUrl]);

  const visibleAccessories = useMemo(() => {
    if (perPage === 'all') {
      return sortedAccessories;
    }

    const start = (currentPage - 1) * perPage;

    return sortedAccessories.slice(start, start + perPage);
  }, [sortedAccessories, currentPage, perPage]);

  const visiblePages = useMemo(() => {
    if (totalPages <= 1) {
      return [];
    }

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    let start = 1;

    if (totalPages > 4) {
      if (currentPage <= 2) {
        start = 1;
      } else if (currentPage >= totalPages - 1) {
        start = totalPages - 3;
      } else {
        start = currentPage - 1;
      }
    }

    return pages.slice(start - 1, start - 1 + 4);
  }, [totalPages, currentPage]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const isEmpty = !isLoading && !error && totalItems === 0;

  const skeletonCount = perPage === 'all' ? 16 : Number(perPage);

  return (
    <Container>
      <nav className={styles.breadcrumbs}>
        <Link to="/" className={styles.breadcrumbLink}>
          <img
            src="/img/icons/home.svg"
            alt="Home"
            className={styles.homeIcon}
          />
        </Link>

        <img
          src="/img/icons/vector.svg"
          alt=""
          className={styles.separatorIcon}
        />
        <span className={styles.current}>Accessories</span>
      </nav>

      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Accessories</h1>
          <p className={styles.modelsCount}>
            {isLoading ? 'Loading...' : `${totalItems} models`}
          </p>
        </div>

        <div className={styles.controls}>
          <div className={styles.control}>
            <span className={styles.controlLabel}>Sort by</span>
            <select
              value={SORT_LABEL_MAP[sortParam]}
              onChange={e =>
                updateUrl({
                  sort: SORT_MAP[e.target.value as SortLabel],
                  page: 1,
                })
              }
              className={styles.select}
              disabled={isLoading}
            >
              {SORT_OPTIONS.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.control}>
            <span className={styles.controlLabel}>Items on page</span>
            <select
              value={perPage}
              onChange={e =>
                updateUrl({
                  perPage:
                    e.target.value === 'all'
                      ? 'all'
                      : (Number(e.target.value) as PerPage),
                  page: 1,
                })
              }
              className={styles.select}
              disabled={isLoading}
            >
              {PER_PAGE_OPTIONS.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {error && <p className={styles.error}>{error}</p>}
      {isEmpty && <p className={styles.empty}>There are no accessories yet</p>}

      {isLoading && (
        <div className={styles.grid}>
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!isLoading && !error && totalItems > 0 && (
        <>
          <div className={styles.grid}>
            {visibleAccessories.map(accessory => (
              <ProductCard key={accessory.id} product={accessory} />
            ))}
          </div>

          {totalPages > 1 && (
            <nav className={styles.pagination} aria-label="Pagination">
              <button
                type="button"
                className={styles.navButton}
                onClick={() => updateUrl({ page: currentPage - 1 })}
                disabled={currentPage === 1}
              >
                ‹
              </button>

              {visiblePages.map(page => (
                <button
                  type="button"
                  key={page}
                  onClick={() => updateUrl({ page })}
                  className={
                    page === currentPage
                      ? styles.pageButtonActive
                      : styles.pageButton
                  }
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                className={styles.navButton}
                onClick={() => updateUrl({ page: currentPage + 1 })}
                disabled={currentPage === totalPages}
              >
                ›
              </button>
            </nav>
          )}
        </>
      )}
    </Container>
  );
};
