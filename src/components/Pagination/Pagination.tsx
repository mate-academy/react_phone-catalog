import styles from './Pagination.module.scss';

interface PaginationProps {
  page: number;
  perPage: number;
  total: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  page,
  perPage,
  total,
  onPageChange,
}: PaginationProps) => {
  const totalPages = perPage > 0 ? Math.ceil(total / perPage) : 1;

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={styles.pagination}>
      <div className={styles.controls}>
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
      <label>{total} products</label>
    </div>
  );
};
