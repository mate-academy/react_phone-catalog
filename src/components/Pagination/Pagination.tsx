import styles from './Pagination.module.scss';

const MAX_BUTTONS = 4;

interface Props {
  pagesCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  pagesCount,
  currentPage,
  onPageChange,
}: Props) => {
  if (pagesCount <= 1) {
    return null;
  }

  const first = Math.max(
    1,
    Math.min(currentPage - 2, pagesCount - MAX_BUTTONS + 1),
  );
  const last = Math.min(pagesCount, first + MAX_BUTTONS - 1);

  const pages: number[] = [];

  for (let page = first; page <= last; page += 1) {
    pages.push(page);
  }

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <button
        type="button"
        className={styles.button}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <img src="img/icons/arrow-left.svg" alt="" width="16" height="16" />
      </button>

      {pages.map(page => (
        <button
          key={page}
          type="button"
          className={styles.button}
          aria-current={page === currentPage ? 'page' : undefined}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        className={styles.button}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === pagesCount}
        aria-label="Next page"
      >
        <img src="img/icons/arrow-right.svg" alt="" width="16" height="16" />
      </button>
    </nav>
  );
};
