import classNames from 'classnames';
import { Icon } from '../Icon';
import styles from './Pagination.module.scss';

interface Props {
  total: number;
  perPage: number | 'all';
  currentPage: number;
  onPageChange: (page: number) => void;
}

type PageItem = number | 'ellipsis';

function getVisiblePages(currentPage: number, pageCount: number): PageItem[] {
  if (pageCount <= 5) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  const pages = new Set<number>([1, pageCount, currentPage]);

  if (currentPage - 1 > 1) {
    pages.add(currentPage - 1);
  }

  if (currentPage + 1 < pageCount) {
    pages.add(currentPage + 1);
  }

  // Near the start: keep a compact block like 1 2 3 ... last
  if (currentPage <= 2) {
    pages.add(2);
    pages.add(3);
  }

  // Near the end: keep a compact block like 1 ... last-2 last-1 last
  if (currentPage >= pageCount - 1) {
    pages.add(pageCount - 1);
    pages.add(pageCount - 2);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const result: PageItem[] = [];

  sorted.forEach((page, index) => {
    if (index > 0 && page - sorted[index - 1] > 1) {
      result.push('ellipsis');
    }

    result.push(page);
  });

  return result;
}

export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: Props) => {
  if (perPage === 'all' || perPage >= total) {
    return null;
  }

  const pageCount = Math.ceil(total / perPage);
  const visiblePages = getVisiblePages(currentPage, pageCount);

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        className={styles.button}
        disabled={currentPage === 1}
        aria-label="Previous page"
        onClick={() => onPageChange(currentPage - 1)}
      >
        <Icon name="arrow-left" />
      </button>

      <div className={styles.pages}>
        {visiblePages.map((item, index) =>
          item === 'ellipsis' ? (
            <span
              key={`ellipsis-${index}`}
              className={styles.ellipsis}
              aria-hidden="true"
            >
              ...
            </span>
          ) : (
            <button
              key={item}
              type="button"
              className={classNames(styles.page, {
                [styles.active]: item === currentPage,
              })}
              onClick={() => onPageChange(item)}
            >
              {item}
            </button>
          ),
        )}
      </div>

      <button
        type="button"
        className={styles.button}
        disabled={currentPage === pageCount}
        aria-label="Next page"
        onClick={() => onPageChange(currentPage + 1)}
      >
        <Icon name="arrow-right" />
      </button>
    </div>
  );
};
