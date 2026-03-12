import classNames from 'classnames';
import styles from './Pagination.module.scss';

const VISIBLE_PAGES = 4;

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  if (totalPages <= 1) {
    return null;
  }

  // Calculate the visible window of pages
  let start = Math.max(1, currentPage - 1);
  const end = Math.min(totalPages, start + VISIBLE_PAGES - 1);

  start = Math.max(1, end - VISIBLE_PAGES + 1);

  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

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

  return (
    <ul className={styles.pagination} data-cy="pagination">
      <li>
        <button
          type="button"
          className={classNames(styles.pagination__arrow, {
            [styles['pagination__arrow--disabled']]: currentPage === 1,
          })}
          disabled={currentPage === 1}
          onClick={handlePrev}
          data-cy="paginationLeft"
          aria-label="Previous page"
        >
          <img src="img/icons/arrow-left.svg" alt="Previous" />
        </button>
      </li>

      {pages.map(page => (
        <li key={page}>
          <button
            type="button"
            className={classNames(styles.pagination__page, {
              [styles['pagination__page--active']]: page === currentPage,
            })}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        </li>
      ))}

      <li>
        <button
          type="button"
          className={classNames(styles.pagination__arrow, {
            [styles['pagination__arrow--disabled']]: currentPage === totalPages,
          })}
          disabled={currentPage === totalPages}
          onClick={handleNext}
          data-cy="paginationRight"
          aria-label="Next page"
        >
          <img src="img/icons/arrow-right.svg" alt="Next" />
        </button>
      </li>
    </ul>
  );
};
