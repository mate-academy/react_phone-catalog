import React from 'react';
import classNames from 'classnames';
import styles from './Pagination.module.scss';
import { getNumbers } from '../../utils';

const MAX_VISIBLE_PAGES = 4;

const getVisiblePages = (
  maxVisiblePages: number,
  currentPage: number,
  paginationItemsCount: number,
) => {
  let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
  const endPage = Math.min(
    startPage + maxVisiblePages - 1,
    paginationItemsCount,
  );

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(endPage - maxVisiblePages + 1, 1);
  }

  return getNumbers(startPage, endPage);
};

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const paginationItemsCount = React.useMemo(
    () => Math.ceil(total / perPage),
    [perPage, total],
  );

  const maxVisiblePages = MAX_VISIBLE_PAGES;

  const visiblePages = getVisiblePages(
    maxVisiblePages,
    currentPage,
    paginationItemsCount,
  );

  const nextPage = currentPage >= paginationItemsCount;
  const previousPage = currentPage === 1;

  const handleNextLinkClick = () => {
    if (currentPage !== paginationItemsCount) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePreviousLinkClick = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  if (!isNaN(perPage)) {
    return (
      <ul className={styles.Pagination}>
        <li
          className={classNames(
            `${styles.Pagination__button} ${styles['Pagination__button--prev']}`,
            previousPage ? `${styles['Pagination__button--disabled']}` : '',
          )}
          onClick={handlePreviousLinkClick}
        ></li>

        {visiblePages.map((item, index) => (
          <li
            className={classNames(
              styles.Pagination__button,
              item === currentPage
                ? `${styles['Pagination__button--active']}`
                : '',
            )}
            onClick={() => onPageChange(item)}
            key={index}
          >
            {item}
          </li>
        ))}

        <li
          className={classNames(
            `${styles.Pagination__button} ${styles['Pagination__button--next']}`,
            nextPage ? `${styles['Pagination__button--disabled']}` : '',
          )}
          onClick={handleNextLinkClick}
        ></li>
      </ul>
    );
  }

  return null;
};
