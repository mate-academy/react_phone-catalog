import classNames from 'classnames';
import ArrowLeftIcon from '../../../../assets/icons/arrow-left.svg?react';
import ArrowRightIcon from '../../../../assets/icons/arrow-right.svg?react';
import styles from './Pagination.module.scss';

const MAX_VISIBLE_PAGES = 4;

function getVisiblePages(currentPage: number, totalPages: number) {
  const count = Math.min(MAX_VISIBLE_PAGES, totalPages);
  const centeredStart = currentPage - Math.floor(count / 2);
  const start = Math.min(Math.max(centeredStart, 1), totalPages - count + 1);

  return Array.from({ length: count }, (_, index) => start + index);
}

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

  const pages = getVisiblePages(currentPage, totalPages);

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <button
        type="button"
        className={styles.arrow}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
      >
        <ArrowLeftIcon />
      </button>

      <ul className={styles.pages}>
        {pages.map(page => (
          <li key={page}>
            <button
              type="button"
              className={classNames(styles.page, {
                [styles.active]: page === currentPage,
              })}
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={styles.arrow}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
      >
        <ArrowRightIcon />
      </button>
    </nav>
  );
};
