import classNames from 'classnames';
import styles from './Pagination.module.scss';

const MAX_CONTROLS = 6;

const getVisiblePages = (
  currentPage: number,
  totalPages: number,
  maxNumbers: number,
) => {
  if (totalPages <= 0 || maxNumbers <= 0) {
    return [];
  }

  if (totalPages <= maxNumbers) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const half = Math.floor(maxNumbers / 2);
  let start = currentPage - half;
  let end = start + maxNumbers - 1;

  if (start < 1) {
    start = 1;
    end = maxNumbers;
  }

  if (end > totalPages) {
    end = totalPages;
    start = totalPages - maxNumbers + 1;
  }

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};

interface Props {
  total: number;
  perPage: number | 'all';
  currentPage: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number | 'all') => void;
  perPageOptions?: Array<number | 'all'>;
  showPerPage?: boolean;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
  onPerPageChange,
  perPageOptions = [4, 8, 16, 'all'],
  showPerPage = true,
}) => {
  const totalPages =
    perPage === 'all' ? 1 : Math.max(1, Math.ceil(total / perPage));
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);
  const showPages = totalPages > 1;

  const hasOverflow = totalPages > MAX_CONTROLS;
  const showPrev = hasOverflow && safeCurrentPage > 1;
  const showNext = hasOverflow && safeCurrentPage < totalPages;
  const maxNumbers = hasOverflow
    ? Math.max(1, MAX_CONTROLS - (showPrev ? 1 : 0) - (showNext ? 1 : 0))
    : totalPages;
  const pages = getVisiblePages(safeCurrentPage, totalPages, maxNumbers);

  return (
    <div className={styles.pagination}>
      {showPages && (
        <div className={styles.controls}>
          {showPrev && (
            <button
              type="button"
              className={styles.arrow}
              onClick={() => onPageChange(safeCurrentPage - 1)}
            >
              ‹
            </button>
          )}

          <div className={styles.pages}>
            {pages.map(page => (
              <button
                type="button"
                key={page}
                className={classNames(styles.page, {
                  [styles.active]: page === safeCurrentPage,
                })}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            ))}
          </div>

          {showNext && (
            <button
              type="button"
              className={styles.arrow}
              onClick={() => onPageChange(safeCurrentPage + 1)}
            >
              ›
            </button>
          )}
        </div>
      )}

      {showPerPage && (
        <label className={styles.perPage}>
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
            {perPageOptions.map(option => (
              <option key={option} value={option}>
                {option === 'all' ? 'All' : option}
              </option>
            ))}
          </select>
        </label>
      )}
    </div>
  );
};
