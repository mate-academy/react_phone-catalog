import styles from './Pagination.module.scss';
import React from 'react';
import classNames from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const getVisiblePages = (
  currentPage: number,
  totalPages: number,
): (number | 'dots')[] => {
  const delta = 2;
  const range: (number | 'dots')[] = [];

  const left = Math.max(2, currentPage - delta);
  const right = Math.min(totalPages - 1, currentPage + delta);

  range.push(1);

  if (left > 2) {
    range.push('dots');
  }

  for (let i = left; i <= right; i++) {
    range.push(i);
  }

  if (right < totalPages - 1) {
    range.push('dots');
  }

  if (totalPages > 1) {
    range.push(totalPages);
  }

  return range;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const pages = getVisiblePages(currentPage, totalPages);

  return (
    <ul className={styles.pagination}>
      <li>
        <a
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          className={classNames(
            currentPage === 1 ? styles.buttonDisabled : styles.button,
          )}
          onClick={e => {
            e.preventDefault();
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              /* eslint-disable-next-line max-len */
              d="M10.4715 3.52861C10.2111 3.26826 9.78903 3.26826 9.52868 3.52861L5.52868 7.52861C5.26833 7.78896 5.26833 8.21107 5.52868 8.47141L9.52868 12.4714C9.78903 12.7318 10.2111 12.7318 10.4715 12.4714C10.7318 12.2111 10.7318 11.789 10.4715 11.5286L6.94289 8.00001L10.4715 4.47141C10.7318 4.21107 10.7318 3.78896 10.4715 3.52861Z"
              fill="#B4BDC4"
            />
          </svg>
        </a>
      </li>
      {pages.map((n, index) => (
        <li key={index}>
          {n === 'dots' ? (
            <span className={styles.dots}>...</span>
          ) : (
            <a
              className={classNames(
                n === currentPage ? styles.pageActive : styles.page,
              )}
              onClick={e => {
                e.preventDefault();
                onPageChange(n);
              }}
            >
              <p>{n}</p>
            </a>
          )}
        </li>
      ))}

      <li>
        <a
          aria-disabled={currentPage === totalPages ? 'true' : 'false'}
          className={classNames(
            currentPage === totalPages ? styles.buttonDisabled : styles.button,
          )}
          onClick={e => {
            e.preventDefault();
            if (currentPage < totalPages) {
              onPageChange(currentPage + 1);
            }
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              /* eslint-disable-next-line max-len */
              d="M5.52876 3.52861C5.78911 3.26826 6.21122 3.26826 6.47157 3.52861L10.4716 7.52861C10.7319 7.78896 10.7319 8.21107 10.4716 8.47141L6.47157 12.4714C6.21122 12.7318 5.78911 12.7318 5.52876 12.4714C5.26841 12.2111 5.26841 11.789 5.52876 11.5286L9.05735 8.00001L5.52876 4.47141C5.26841 4.21107 5.26841 3.78896 5.52876 3.52861Z"
              fill="#B4BDC4"
            />
          </svg>
        </a>
      </li>
    </ul>
  );
};
