import styles from './Pagination.module.scss';

type Props = {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
};

type PageItem = number | 'start-dots' | 'end-dots';

function getPages(currentPage: number, totalPages: number): PageItem[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages: PageItem[] = [1];

  const start = Math.max(2, currentPage - 1);

  const end = Math.min(totalPages - 1, currentPage + 1);

  if (start > 2) {
    pages.push('start-dots');
  }

  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }

  if (end < totalPages - 1) {
    pages.push('end-dots');
  }

  pages.push(totalPages);

  return pages;
}

export default function Pagination({
  currentPage,
  totalPages,
  onChange,
}: Props) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = getPages(currentPage, totalPages);

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onChange(currentPage - 1)}
        aria-label="Previous page"
      >
        ‹
      </button>

      {pages.map((item, index) =>
        typeof item === 'number' ? (
          <button
            type="button"
            key={item}
            className={item === currentPage ? styles.active : ''}
            onClick={() => onChange(item)}
          >
            {item}
          </button>
        ) : (
          <span className={styles.ellipsis} key={`${item}-${index}`}>
            …
          </span>
        ),
      )}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onChange(currentPage + 1)}
        aria-label="Next page"
      >
        ›
      </button>
    </div>
  );
}
