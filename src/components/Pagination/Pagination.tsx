import styles from './Pagination.module.scss';
import { getPublicUrl } from '../../utils/getPublicUrl';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: Props) => {
  const totalPages = Math.ceil(total / perPage);
  const visiblePagesCount = 4;

  const firstVisiblePage = Math.min(
    Math.max(currentPage - 2, 1),
    Math.max(totalPages - visiblePagesCount + 1, 1),
  );

  const pages = Array.from(
    { length: Math.min(visiblePagesCount, totalPages) },
    (_, index) => firstVisiblePage + index,
  );

  return (
    <div className={styles.pagination}>
      <button
        className={styles.arrowButton}
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
      >
        <img
          className={`${styles.chevron} ${styles.chevronLeft}`}
          src={getPublicUrl('/img/icon/product-chevron.svg')}
          alt=""
        />
      </button>

      {pages.map(page => (
        <button
          key={page}
          className={`${styles.pageButton} ${
            page === currentPage ? styles.active : ''
          }`}
          type="button"
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className={styles.arrowButton}
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
      >
        <img
          className={styles.chevron}
          src={getPublicUrl('/img/icon/product-chevron.svg')}
          alt=""
        />
      </button>
    </div>
  );
};
