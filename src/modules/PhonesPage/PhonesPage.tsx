import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import styles from './PhonesPage.module.scss';
import { getPhones, type Phone } from '../../api/phones';
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
import { withBase } from '../shared/utils/baseUrl';

export const PhonesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [phones, setPhones] = useState<Phone[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sortParam: SortParam = normalizeSort(searchParams.get('sort'));
  const perPage: PerPage = normalizePerPage(searchParams.get('perPage'));
  const currentPage: number = normalizePage(searchParams.get('page'));

  const updateUrl = useCallback(
    (next: { sort?: SortParam; perPage?: PerPage; page?: number }) => {
      const s = next.sort ?? sortParam;
      const p = next.perPage ?? perPage;
      const pg = next.page ?? currentPage;

      const params: Record<string, string> = {};

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

    getPhones()
      .then(setPhones)
      .catch(() => setError('Failed to load phones'))
      .finally(() => setIsLoading(false));
  }, []);

  const sortedPhones = useMemo(() => {
    const data = [...phones];

    if (sortParam === 'title') {
      return data.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortParam === 'price') {
      return data.sort((a, b) => a.price - b.price);
    }

    return data;
  }, [phones, sortParam]);

  const totalItems = sortedPhones.length;

  const totalPages =
    perPage === 'all' || totalItems === 0 ? 0 : Math.ceil(totalItems / perPage);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      updateUrl({ page: totalPages });
    }
  }, [currentPage, totalPages, updateUrl]);

  const visiblePhones = useMemo(() => {
    if (perPage === 'all') {
      return sortedPhones;
    }

    const start = (currentPage - 1) * perPage;

    return sortedPhones.slice(start, start + perPage);
  }, [sortedPhones, currentPage, perPage]);

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
            src={withBase('img/icons/home.svg')}
            alt="Home"
            className={styles.homeIcon}
          />
        </Link>

        <img
          src={withBase('img/icons/vector.svg')}
          alt=""
          className={styles.separatorIcon}
        />
        <span className={styles.current}>Phones</span>
      </nav>

      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Mobile phones</h1>
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
      {isEmpty && <p className={styles.empty}>There are no phones yet</p>}

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
            {visiblePhones.map(phone => (
              <ProductCard key={phone.id} product={phone} />
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
