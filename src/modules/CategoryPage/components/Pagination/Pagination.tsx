import { Icon } from '@/components/Icon';
import styles from './Pagination.module.scss';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const PAGE_SIBLINGS = 1;

function getPageItems(
  currentPage: number,
  pageCount: number,
): (number | '…')[] {
  const pages = new Set<number>([
    1,
    pageCount,
    currentPage,
    ...Array.from(
      { length: PAGE_SIBLINGS * 2 + 1 },
      (_, index) => currentPage - PAGE_SIBLINGS + index,
    ),
  ]);

  const sorted = Array.from(pages)
    .filter(page => page >= 1 && page <= pageCount)
    .sort((a, b) => a - b);

  const items: (number | '…')[] = [];

  sorted.forEach((page, index) => {
    if (index > 0 && page - sorted[index - 1] > 1) {
      items.push('…');
    }

    items.push(page);
  });

  return items;
}

export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: Props) => {
  const pageCount = Math.ceil(total / perPage);

  if (pageCount <= 1) {
    return null;
  }

  const pages = getPageItems(currentPage, pageCount);

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <button
        type="button"
        className={styles.arrow}
        aria-label="Previous page"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <Icon name="chevron-left" />
      </button>

      <ul className={styles.list}>
        {pages.map((page, index) =>
          page === '…' ? (
            <li key={`ellipsis-${index}`} className={styles.ellipsis}>
              {page}
            </li>
          ) : (
            <li key={page}>
              <button
                type="button"
                className={[
                  styles.page,
                  page === currentPage ? styles.pageActive : '',
                ].join(' ')}
                aria-current={page === currentPage}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            </li>
          ),
        )}
      </ul>

      <button
        type="button"
        className={styles.arrow}
        aria-label="Next page"
        disabled={currentPage === pageCount}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <Icon name="chevron-right" />
      </button>
    </nav>
  );
};
