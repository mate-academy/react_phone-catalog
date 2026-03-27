import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  perPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalCount,
  perPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalCount / perPage);

  const getPages = (): (number | '...')[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, '...', totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [
        1,
        '...',
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages,
    ];
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.arrow}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={16} />
      </button>

      {getPages().map((page, index) =>
        page === '...' ? (
          <span key={`dots-${index}`} className={styles.dots}>
            ...
          </span>
        ) : (
          <button
            key={page}
            className={`${styles.page} ${page === currentPage ? styles.active : ''}`}
            onClick={() => onPageChange(page as number)}
          >
            {page}
          </button>
        ),
      )}

      <button
        className={styles.arrow}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};
