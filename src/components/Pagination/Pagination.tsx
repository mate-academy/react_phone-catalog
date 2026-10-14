import { Icon } from '../Icon';
import styles from './Pagination.module.scss';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: Props) => {
  if (totalPages <= 1) {
    return null;
  }

  const firstVisiblePage = Math.max(
    1,
    Math.min(currentPage - 1, totalPages - 3),
  );
  const pages = Array.from(
    { length: Math.min(totalPages, 4) },
    (_, index) => firstVisiblePage + index,
  );

  return (
    <nav className={styles.pagination} aria-label="Product pages">
      <button
        type="button"
        className={`icon-button ${styles.arrow}`}
        aria-label="Previous page"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <Icon name="left" />
      </button>

      {pages.map(page => (
        <button
          key={page}
          type="button"
          className={`${styles.page} ${page === currentPage ? styles.active : ''}`}
          aria-label={`Page ${page}`}
          aria-current={page === currentPage ? 'page' : undefined}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        className={`icon-button ${styles.arrow}`}
        aria-label="Next page"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <Icon name="right" />
      </button>
    </nav>
  );
};
