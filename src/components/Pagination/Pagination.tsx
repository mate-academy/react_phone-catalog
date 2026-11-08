import { useEffect, useState } from 'react';
import styles from './Pagination.module.scss';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  total: number;
};

const getVisiblePages = (
  currentPage: number,
  totalPages: number,
  isDesktop: boolean,
): (number | string)[] => {
  if (isDesktop || totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | string)[] = [];

  pages.push(1);

  if (currentPage > 3) {
    pages.push('...');
  }

  for (
    let i = Math.max(2, currentPage - 1);
    i <= Math.min(totalPages - 1, currentPage + 1);
    i++
  ) {
    pages.push(i);
  }

  if (currentPage < totalPages - 2) {
    pages.push('...');
  }

  pages.push(totalPages);

  return pages;
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [isDesktop, setIsDesktop] = useState(
    window.matchMedia('(min-width: 1200px)').matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1200px)');

    const handleChange = (event: MediaQueryListEvent) => {
      setIsDesktop(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = getVisiblePages(currentPage, totalPages, isDesktop);

  return (
    <ul className={styles.pagination}>
      <li>
        <button
          className={styles.arrow}
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          ‹
        </button>
      </li>

      {visiblePages.map((page, index) => (
        <li key={`${page}-${index}`}>
          {page === '...' ? (
            <span className={styles.dots}>...</span>
          ) : (
            <button
              className={
                page === currentPage
                  ? `${styles.page} ${styles.active}`
                  : styles.page
              }
              onClick={() => onPageChange(page as number)}
            >
              {page}
            </button>
          )}
        </li>
      ))}

      <li>
        <button
          className={styles.arrow}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          ›
        </button>
      </li>
    </ul>
  );
};
