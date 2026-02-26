import React from 'react';
import styles from './Pagination.module.scss';
import IconButtonLeft from '../IconButtonLeft/index';
import IconButtonRight from '../IconButtonRight/index';

type Props = {
  total: number;
  currentPage: number; // 1-based
  perPage: number | 'all';
  onChange: (page: number, perPage: number | 'all') => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  currentPage,
  perPage,
  onChange,
}) => {
  const effectivePerPage = perPage === 'all' ? total : perPage;
  const totalPages =
    effectivePerPage === 0
      ? 1
      : Math.max(1, Math.ceil(total / effectivePerPage));
  const prevDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= totalPages;
  const handlePrev = () => {
    if (!prevDisabled) {
      onChange(currentPage - 1, perPage);
    }
  };

  const handleNext = () => {
    if (!nextDisabled) {
      onChange(currentPage + 1, perPage);
    }
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const getVisiblePages = () => {
    if (totalPages <= 7) {
      return pageNumbers;
    }

    const pages = new Set<number>();

    pages.add(1);
    pages.add(2);
    pages.add(totalPages - 1);
    pages.add(totalPages);
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i >= 1 && i <= totalPages) {
        pages.add(i);
      }
    }

    return Array.from(pages).sort((a, b) => a - b);
  };

  const visiblePages = getVisiblePages();

  return (
    <>
      <div className={styles.pagination}>
        <div className={styles.pagination__content}>
          <IconButtonLeft
            className={`${styles.icon} ${styles['icon--button-left']}`}
            handleClick={handlePrev}
            isDisabled={prevDisabled}
          />

          <nav aria-label="Pagination" className={styles.pagination__nav}>
            <ul
              style={{
                display: 'flex',
                gap: 8,
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}
            >
              {visiblePages.map((p, idx) => {
                const prev = visiblePages[idx - 1];
                const needEllipsis = prev && p - prev > 1;

                return (
                  <React.Fragment key={p}>
                    {needEllipsis && <li style={{ padding: '0 8px' }}>…</li>}
                    <li>
                      <button
                        className={`${styles.button}`}
                        aria-current={p === currentPage ? 'page' : undefined}
                        onClick={() => onChange(p, perPage)}
                      >
                        {p}
                      </button>
                    </li>
                  </React.Fragment>
                );
              })}
            </ul>
          </nav>
          <IconButtonRight
            className={`${styles.icon} ${styles['icon--button-right']}`}
            handleClick={handleNext}
            isDisabled={nextDisabled}
          />
        </div>
      </div>
    </>
  );
};
