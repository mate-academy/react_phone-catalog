import classNames from 'classnames';
import styles from './Pagination.module.scss';
import { useTheme } from '../../contexts/ThemeContext';

interface Props {
  total: number;
  perPage: number | string;
  currentPage: number;
  onPageChange: (p: number) => void;
}

// eslint-disable-next-line max-len
export const Pagination = ({ total, perPage, currentPage, onPageChange }: Props): JSX.Element => {
  const { theme } = useTheme();
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
          [styles['pagination__button--disabled']]: currentPage === 1,
          [styles['pagination__button--lightTheme']]: theme === 'light',
          [styles['pagination__button--disabled-lightTheme']]:
            theme === 'light' && currentPage === 1,
        })}
        disabled={currentPage === 1}
      >
        <a
          className={classNames(
            styles.pagination__arrowLink,
            styles['pagination__arrowLink--left'],
            {
              [styles['pagination__arrowLink--left-lightTheme']]: theme === 'light',
              [styles['pagination__arrowLink--left-disabled']]: currentPage === 1,
              [styles['pagination__arrowLink--left-lightTheme-disabled']]:
                theme === 'light' && currentPage === 1,
            },
          )}
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
              [styles['pagination__item--active']]: currentPage === page,
              [styles['pagination__item--lightTheme']]: theme === 'light',
              [styles['pagination__item--active-lightTheme']]:
                theme === 'light' && currentPage === page,
            })}
          >
            {page === '...' ? (
              <a
                href="#ellipsis"
                className={`${styles.pagination__link}`}
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
                className={classNames(styles.pagination__link, {
                  [styles['pagination__link--active-lightTheme']]:
                    currentPage === page && theme === 'light',
                })}
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
          [styles['pagination__button--disabled']]: currentPage === totalPages,
          [styles['pagination__button--lightTheme']]: theme === 'light',
          [styles['pagination__button--disabled-lightTheme']]:
            theme === 'light' && currentPage === totalPages,
        })}
        disabled={currentPage === totalPages}
      >
        <a
          className={classNames(
            styles.pagination__arrowLink,
            styles['pagination__arrowLink--right'],
            {
              [styles['pagination__arrowLink--right-lightTheme']]: theme === 'light',
              [styles['pagination__arrowLink--right-disabled']]: currentPage === totalPages,
              [styles['pagination__arrowLink--right-lightTheme-disabled']]:
                theme === 'light' && currentPage === totalPages,
            },
          )}
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
