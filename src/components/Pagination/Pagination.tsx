import styles from './Pagination.module.scss';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  total: number;
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) {
    return null;
  }

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

      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <li key={page}>
          <button
            className={
              page === currentPage
                ? `${styles.page} ${styles.active}`
                : styles.page
            }
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
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
