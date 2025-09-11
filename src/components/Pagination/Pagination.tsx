import classNames from 'classnames';
import styles from './Pagination.module.scss';

interface Props {
  total: number;
  perPage: number | string;
  currentPage: number;
  onPageChange: (p: number) => void;
}

// eslint-disable-next-line max-len
export const Pagination = ({ total, perPage, currentPage, onPageChange }: Props): JSX.Element => {
  let totalPages = total;

  if (typeof perPage === 'number') {
    totalPages = Math.ceil(total / perPage);
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 8) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push('...');
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    pages.push(totalPages);

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <ul className={styles.pagination}>
      <button
        className={classNames(styles.pagination__button, {
          [styles.pagination__buttonDisabled]: currentPage === 1,
        })}
        disabled={currentPage === 1}
      >
        <a
          className={`${styles.pagination__arrowLinkLeft} ${styles.pagination__arrowLink}`}
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={e => {
            e.preventDefault();
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          }}
        ></a>
      </button>

      <ul className={styles.pagination__itemList}>
        {pages.map((page, idx) => (
          <li
            key={idx}
            className={classNames(styles.pagination__item, {
              [styles.pagination__itemActive]: currentPage === page,
            })}
          >
            {page === '...' ? (
              <a
                href="#ellipsis"
                className={styles.pagination__link}
                onClick={e => {
                  e.preventDefault();
                  if (idx === 1) {
                    onPageChange(Math.max(currentPage - 3, 1));
                  } else {
                    onPageChange(Math.min(currentPage + 3, totalPages));
                  }
                }}
              >
                …
              </a>
            ) : (
              <a
                data-cy="pageLink"
                className={styles.pagination__link}
                href={`#${page}`}
                onClick={e => {
                  e.preventDefault();
                  onPageChange(Number(page));
                }}
              >
                {page}
              </a>
            )}
          </li>
        ))}
      </ul>

      <button
        className={classNames(styles.pagination__button, {
          [styles.pagination__buttonDisabled]: currentPage === totalPages,
        })}
        disabled={currentPage === totalPages}
      >
        <a
          className={`${styles.pagination__arrowLinkRight} ${styles.pagination__arrowLink} ${currentPage === totalPages ? 'disabled' : ''}`}
          href="#next"
          aria-disabled={currentPage === totalPages}
          onClick={e => {
            e.preventDefault();
            if (currentPage < totalPages) {
              onPageChange(currentPage + 1);
            }
          }}
        ></a>
      </button>
    </ul>
  );
};
