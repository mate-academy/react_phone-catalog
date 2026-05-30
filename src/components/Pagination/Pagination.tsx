import styles from './Pagination.module.scss';

interface PaginationProps {
  page: number;
  perPage: number | 'all';
  total: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (value: number | 'all') => void;
}

export const Pagination = ({
  page,
  perPage,
  total,
  onPageChange,
  onPerPageChange,
}: PaginationProps) => {
  const perPageNumber = perPage === 'all' ? total : perPage;
  const totalPages = perPageNumber > 0 ? Math.ceil(total / perPageNumber) : 1;
  const canShow = totalPages > 1;

  if (!canShow) {
    return (
      <div className={styles.pagination}>
        <label>
          Items on page:
          <select
            value={perPage}
            onChange={event =>
              onPerPageChange(
                event.target.value === 'all'
                  ? 'all'
                  : Number(event.target.value),
              )
            }
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="all">All</option>
          </select>
        </label>
      </div>
    );
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
      <label>
        Items on page:
        <select
          value={perPage}
          onChange={event =>
            onPerPageChange(
              event.target.value === 'all' ? 'all' : Number(event.target.value),
            )
          }
        >
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="16">16</option>
          <option value="all">All</option>
        </select>
      </label>
    </div>
  );
};
