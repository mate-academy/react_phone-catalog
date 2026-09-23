import cn from 'classnames';
import { IconChevronLeft, IconChevronRight } from '../Icons';
import styles from './Pagination.module.scss';

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

type PaginationItem =
  | { type: 'page'; value: number }
  | { type: 'dots'; id: string };

const getItems = (pageCount: number, current: number): PaginationItem[] => {
  if (pageCount <= 4) {
    return Array.from({ length: pageCount }, (_, index) => ({
      type: 'page',
      value: index + 1,
    }));
  }

  if (current <= 3) {
    return [
      { type: 'page', value: 1 },
      { type: 'page', value: 2 },
      { type: 'page', value: 3 },
      { type: 'page', value: 4 },
    ];
  }

  const start = Math.min(current - 1, pageCount - 2);

  return [
    { type: 'page', value: 1 },
    { type: 'dots', id: 'left' },
    { type: 'page', value: start },
    { type: 'page', value: start + 1 },
    { type: 'page', value: start + 2 },
  ];
};

export const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const items = getItems(totalPages, currentPage);

  return (
    <nav className={styles.pagination} data-cy="pagination" aria-label="Pages">
      <button
        type="button"
        className={styles.arrow}
        aria-label="Previous"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <IconChevronLeft />
      </button>

      <ul className={styles.pages}>
        {items.map(item =>
          item.type === 'dots' ? (
            <li key={`dots-${item.id}`} className={styles.dots}>
              …
            </li>
          ) : (
            <li key={item.value}>
              <button
                type="button"
                className={cn(styles.page, {
                  [styles.pageActive]: item.value === currentPage,
                })}
                aria-label={`Go to page ${item.value}`}
                aria-current={item.value === currentPage ? 'page' : undefined}
                disabled={currentPage === item.value}
                onClick={() => onPageChange(item.value)}
              >
                {item.value}
              </button>
            </li>
          ),
        )}
      </ul>

      <button
        type="button"
        className={styles.arrow}
        aria-label="Next"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <IconChevronRight />
      </button>
    </nav>
  );
};
