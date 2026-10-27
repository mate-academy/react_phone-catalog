import styles from './Pagination.module.scss';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: Props) => {
  if (totalPages <= 1) {
    return null;
  }

  const getVisiblePages = (): (number | string)[] => {
    const visiblePages = new Set<number>([
      1,
      2,
      3,
      totalPages,
      currentPage - 1,
      currentPage,
      currentPage + 1,
    ]);

    const sortedPages = Array.from(visiblePages)
      .filter(page => page >= 1 && page <= totalPages)
      .sort((a, b) => a - b);

    const result: (number | string)[] = [];

    sortedPages.forEach((page, index) => {
      const previousPage = sortedPages[index - 1];

      if (previousPage !== undefined) {
        const gap = page - previousPage;

        if (gap === 2) {
          result.push(previousPage + 1);
        } else if (gap > 2) {
          result.push('...');
        }
      }

      result.push(page);
    });

    return result;
  };

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
      >
        ‹
      </button>

      {getVisiblePages().map((page, index) =>
        typeof page === 'string' ? (
          <span key={`dots-${index}`} className={styles.dots}>
            {page}
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={page === currentPage ? styles.active : styles.button}
            aria-current={page === currentPage ? 'page' : undefined}
            aria-label={`Page ${page}`}
          >
            {page}
          </button>
        ),
      )}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
      >
        ›
      </button>
    </nav>
  );
};
