import React from 'react';
import classNames from 'classnames';

import { getPaginationItems } from '../../utils';

import { ArrowLeftIcon, ArrowRightIcon } from '../icons';

import styles from './Pagination.module.scss';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  const paginationItems = getPaginationItems(currentPage, totalPages);

  return (
    <nav className={classNames(styles.pagination, className)}>
      <button
        className={classNames(
          styles.pagination__button,
          styles['pagination__button--nav'],
        )}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ArrowLeftIcon />
      </button>

      <ul className={styles.pagination__list}>
        {paginationItems.map((pageNum, index) => (
          <li key={`${pageNum}-${index}`} className={styles.pagination__item}>
            {isNaN(pageNum) ? (
              '...'
            ) : (
              <button
                className={classNames(
                  styles.pagination__button,
                  styles['pagination__button--page'],
                  {
                    [styles['pagination__button--active']]:
                      currentPage === pageNum,
                  },
                )}
                onClick={() => onPageChange(pageNum)}
                disabled={currentPage === pageNum}
              >
                {pageNum}
              </button>
            )}
          </li>
        ))}
      </ul>

      <button
        className={classNames(
          styles.pagination__button,
          styles['pagination__button--nav'],
        )}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ArrowRightIcon />
      </button>
    </nav>
  );
};
