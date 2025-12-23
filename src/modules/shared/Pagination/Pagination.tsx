import { useSearchParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import styles from './Pagination.module.scss';

import arrowLeft from '/icons/arrow-left.png';
import arrowRight from '/icons/arrow-right.png';

type Props = {
  total: number;
  perPage: string;
};

export const Pagination = ({ total, perPage }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const perPageLower = perPage.toLowerCase();
  const perPageNum = perPageLower === 'all' ? total : Number(perPageLower);

  const totalPages = Math.ceil(total / perPageNum);

  const pagesToShow = useMemo(() => {
    if (totalPages <= 6) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];

    if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, '...', totalPages);
    } else if (currentPage >= totalPages - 3) {
      pages.push(
        1,
        '...',
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      );
    } else {
      pages.push(
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages,
      );
    }

    return pages;
  }, [totalPages, currentPage]);

  const goToPage = (page: number) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set('page', page.toString());
    setSearchParams(newParams);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  if (perPageLower === 'all' || total <= perPageNum) {
    return null;
  }

  return (
    <div className={styles.pagination}>
      <button
        className={styles.arrow}
        onClick={() => goToPage(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        <img src={arrowLeft} alt="Prev" />
      </button>
      <div className={styles.pages}>
        {pagesToShow.map((page, index) =>
          page === '...' ? (
            <span key={`ellipsis-${index}`} className={styles.ellipsis}>
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => goToPage(Number(page))}
              className={[styles.page, page === currentPage && styles.active]
                .filter(Boolean)
                .join(' ')}
            >
              {page}
            </button>
          ),
        )}
      </div>

      <button
        className={styles.arrow}
        onClick={() => goToPage(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        <img src={arrowRight} alt="Next" />
      </button>
    </div>
  );
};
