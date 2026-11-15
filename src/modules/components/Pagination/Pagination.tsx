import styles from './Pagination.module.scss';
import ArrowLeft from '../../../img/icons/Arrow Left.svg';
import ArrowRight from '../../../img/icons/Arrow Right.svg';

type Props = {
  total: number;
  current: number;
  onChange: (page: number) => void;
};

export const Pagination = ({ total, current, onChange }: Props) => {
  const getPages = () => {
    if (total <= 7) {
      return Array.from({ length: total }, (_, index) => index + 1);
    }

    if (current <= 4) {
      return [1, 2, 3, 4, 5, '...', total] as const;
    }

    if (current >= total - 3) {
      return [
        1,
        '...',
        total - 4,
        total - 3,
        total - 2,
        total - 1,
        total,
      ] as const;
    }

    return [1, '...', current - 1, current, current + 1, '...', total] as const;
  };

  const pages = getPages();

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <button
        type="button"
        className={styles.arrow}
        disabled={current === 1}
        onClick={() => onChange(current - 1)}
        aria-label="Previous page"
      >
        <img src={ArrowLeft} alt="Arrow left" />
      </button>

      <ul className={styles.list}>
        {pages.map((pageNumber, index) => (
          <li key={`${pageNumber}-${index}`}>
            {pageNumber === '...' ? (
              <span className={styles.ellipsis}>...</span>
            ) : (
              <button
                type="button"
                className={
                  pageNumber === current
                    ? `${styles.page} ${styles.pageActive}`
                    : styles.page
                }
                aria-current={pageNumber === current ? 'page' : undefined}
                onClick={() => onChange(pageNumber)}
              >
                {pageNumber}
              </button>
            )}
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={styles.arrow}
        disabled={current === total}
        onClick={() => onChange(current + 1)}
        aria-label="Next page"
      >
        <img src={ArrowRight} alt="Arrow right" />
      </button>
    </nav>
  );
};
