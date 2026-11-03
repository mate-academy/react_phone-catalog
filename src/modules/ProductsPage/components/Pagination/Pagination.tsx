import classNames from 'classnames';
import styles from './Pagination.module.scss';

type Props = {
  total: number;
  perPage: string | number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  if (perPage === 'all') {
    return null;
  }

  const itemsPerPage = Number(perPage);
  const totalPages = Math.ceil(total / itemsPerPage);

  if (totalPages <= 1) {
    return null;
  }

  const maxVisiblePages = 4;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = startPage + maxVisiblePages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <nav
      className={styles.pagination}
      data-cy="pagination"
      aria-label="pagination"
    >
      <button
        type="button"
        className={classNames(styles.button, {
          [styles.disabled]: isFirstPage,
        })}
        onClick={handlePrev}
        disabled={isFirstPage}
        data-cy="paginationLeft"
        aria-label="Previous page"
      >
        <img
          src={
            isFirstPage
              ? './img/icons/arrow-left-disabled.svg'
              : './img/icons/arrow-left.svg'
          }
          alt=""
          aria-hidden="true"
        />
      </button>

      <ul className={styles.list}>
        {pages.map(page => {
          const isActive = page === currentPage;

          return (
            <li key={page}>
              <button
                type="button"
                className={classNames(styles.pageButton, {
                  [styles.active]: isActive,
                })}
                onClick={() => onPageChange(page)}
                aria-current={isActive ? 'page' : undefined}
              >
                {page}
              </button>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        className={classNames(styles.button, {
          [styles.disabled]: isLastPage,
        })}
        onClick={handleNext}
        disabled={isLastPage}
        data-cy="paginationRight"
        aria-label="Next page"
      >
        <img
          src={
            isLastPage
              ? './img/icons/arrow-right-disabled.svg'
              : './img/icons/arrow-right.svg'
          }
          alt=""
          aria-hidden="true"
        />
      </button>
    </nav>
  );
};
