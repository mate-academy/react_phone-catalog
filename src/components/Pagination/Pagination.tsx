import styles from './Pagination.module.scss';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

type Props = {
  total: number;
  perPage: string;
};

export const Pagination = ({ total, perPage }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const perPageNum = Number(perPage);
  const totalPages = Math.ceil(total / perPageNum);

  const pagesToShow = useMemo(() => {
    if (totalPages <= 10) {
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

  if (perPage === 'All' || !Number.isFinite(totalPages) || totalPages < 1) {
    return null;
  }

  const goToPage = (page: number) => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.arrow}
        onClick={() => goToPage(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        <img src="./img/Icons/Buttons/Icons/arrow-left.svg" alt="Previous" />
      </button>

      {pagesToShow.map((page, index) => {
        if (page === '...') {
          return (
            <span key={`ellipsis-${index}`} className={styles.ellipsis}>
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            onClick={() => goToPage(Number(page))}
            className={[styles.page, page === currentPage && styles.active]
              .filter(Boolean)
              .join(' ')}
          >
            {page}
          </button>
        );
      })}

      <button
        className={styles.arrow}
        onClick={() => goToPage(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        <img src="./img/Icons/Buttons/Icons/arrow-right.svg" alt="Next" />
      </button>
    </div>
  );
};
