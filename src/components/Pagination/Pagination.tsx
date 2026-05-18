import cn from 'classnames';
import styles from './Pagination.module.scss';

interface Props {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: Props) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) {
    return null;
  }

  const MAX_VISIBLE_PAGES = 5;

  let startPage = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));

  let endPage = startPage + MAX_VISIBLE_PAGES - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
  }

  const pages = [];

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        className={styles.pagination__arrow}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        {'<'}
      </button>

      <ul className={styles.pagination__list}>
        {pages.map(page => (
          <li key={page}>
            <button
              type="button"
              className={cn(styles.pagination__button, {
                [styles['pagination__button--active']]: page === currentPage,
              })}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={styles.pagination__arrow}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        {'>'}
      </button>
    </div>
  );
};
