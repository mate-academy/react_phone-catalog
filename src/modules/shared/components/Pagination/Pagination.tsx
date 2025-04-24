import { Link } from 'react-router-dom';
import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageClick = (page: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getVisiblePages = () => {
    if (totalPages <= 4) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 2) {
      return [1, 2, 3, '...', totalPages];
    }

    if (currentPage >= totalPages - 1) {
      return [1, '...', totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, '...', currentPage, '...', totalPages];
  };

  return (
    <ul className={styles.pagination__list}>
      <li
        className={`${styles.pagination__item} ${currentPage === 1 ? 'disabled' : ''}`}
      >
        <Link
          data-cy="prevLink"
          className={styles.pagination__link}
          to="#prev"
          aria-disabled={currentPage === 1}
          onClick={handlePageClick(currentPage - 1)}
        >
          &lt;
        </Link>
      </li>
      <div className={styles.pagination__pages}>
        {getVisiblePages().map((page, index) =>
          typeof page === 'number' ? (
            <li
              key={page}
              className={`${styles.pagination__item} ${currentPage === page ? 'active' : ''}`}
            >
              <Link
                data-cy="pageLink"
                className={styles.pagination__link}
                to={`#${page}`}
                onClick={handlePageClick(page)}
              >
                {page}
              </Link>
            </li>
          ) : (
            <li
              key={`ellipsis-${index}`}
              className={styles.pagination__ellipsis}
            >
              ...
            </li>
          ),
        )}
      </div>

      <li
        className={`${styles.pagination__item} ${currentPage === totalPages ? 'disabled' : ''}`}
      >
        <Link
          data-cy="nextLink"
          className={styles.pagination__link}
          to="#next"
          aria-disabled={currentPage === totalPages}
          onClick={handlePageClick(currentPage + 1)}
        >
          &gt;
        </Link>
      </li>
    </ul>
  );
};
