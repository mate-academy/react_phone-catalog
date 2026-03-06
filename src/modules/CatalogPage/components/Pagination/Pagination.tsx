import React, { useEffect } from 'react';
import cl from 'classnames';

import { scrollToTop } from '../../../../utils/scrollToTop';
import { getPaginationItems } from '../../../../utils/getPaginationItems';
import { ArrowLeftIcon } from '../../../../components/Icons/ArrowLeftIcon';
import { ArrowRightIcon } from '../../../../components/Icons/ArrowRightIcon';

import styles from './Pagination.module.scss';

type Props = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  perPage: string;
};

export const Pagination: React.FC<Props> = ({
  totalPages,
  currentPage,
  onPageChange,
  perPage,
}) => {
  useEffect(() => {
    scrollToTop();
  }, [currentPage]);

  if (perPage === 'all') {
    return null;
  }

  const pages = getPaginationItems(currentPage, totalPages);

  return (
    <div className={styles.pagination}>
      <button
        className={cl(styles.button, { [styles.disabled]: currentPage === 1 })}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon />
      </button>

      <div className={styles.list}>
        {pages.map((page, index) => {
          if (typeof page === 'number') {
            return (
              <button
                key={page}
                className={cl(styles.button, {
                  [styles.active]: currentPage === page,
                })}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            );
          } else {
            return (
              <span key={`dots-${index}`} className={styles.dots}>
                ...
              </span>
            );
          }
        })}
      </div>

      <button
        className={cl(styles.button, {
          [styles.disabled]: currentPage === totalPages,
        })}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ArrowRightIcon />
      </button>
    </div>
  );
};
