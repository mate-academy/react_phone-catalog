import classNames from 'classnames';
import styles from './Pagination.module.scss';

type Props = {
  total: number;
  perPage: string;
  currentPage: number;
  onPageChange: (p: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesCount = perPage === 'all' ? 1 : Math.ceil(total / Number(perPage));

  const visibleCount = 4;

  let startPage = Math.max(1, currentPage - Math.floor(visibleCount / 2));

  let endPage = startPage + visibleCount - 1;

  if (endPage > pagesCount) {
    endPage = pagesCount;
    startPage = Math.max(1, endPage - visibleCount + 1);
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  return (
    <ul className={styles.pagination}>
      <li className={styles.pagination__listitem}>
        <button
          type="button"
          className={styles.pagination__leftbtn}
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
        >
          <span className={styles.pagination__leftbtn_icon}></span>
        </button>
      </li>

      <div className={styles.pagination__pages}>
        {pages.map(page => (
          <li key={page}>
            <button
              type="button"
              className={classNames(styles.pagination__pagebtn, {
                [styles.selected]: currentPage === page,
              })}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </div>

      <li className={styles.pagination__listitem}>
        <button
          type="button"
          className={styles.pagination__rightbtn}
          disabled={currentPage === pagesCount}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next page"
        >
          <span className={styles.pagination__rightbtn_icon}></span>
        </button>
      </li>
    </ul>
  );
};
