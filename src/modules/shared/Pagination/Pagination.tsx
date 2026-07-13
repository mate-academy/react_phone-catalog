import classNames from 'classnames';
import React from 'react';
import styles from './Pagination.module.scss';
import { useSearchParams } from 'react-router-dom';

interface Props {
  pages: (number | string)[];
  currentPage: number;
  totalPages: number;
}

export const Pagination: React.FC<Props> = ({
  pages,
  currentPage,
  totalPages,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', newPage.toString());
    setSearchParams(params);
  };

  return (
    <div className={styles.pagination}>
      <button
        className={classNames(
          styles.button,
          currentPage === 1 && styles.buttonDisable,
        )}
        onClick={e => {
          e.preventDefault();
          if (currentPage > 1) {
            handlePageChange(currentPage - 1);
          }
        }}
      >
        <img src="/img/icons/arrow_left.svg" alt="" />
      </button>
      <div className={styles.pages}>
        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`dots-${index}`} className={styles.dots}>
                ...
              </span>
            );
          }

          return (
            <button
              key={page}
              className={classNames(
                currentPage !== page && styles.pagesButton,
                currentPage === page && styles.active,
              )}
              onClick={e => {
                e.preventDefault();
                if (page !== currentPage) {
                  handlePageChange(+page);
                }
              }}
            >
              {page}
            </button>
          );
        })}
      </div>
      <button
        className={classNames(
          styles.button,
          currentPage === totalPages && styles.buttonDisable,
        )}
        onClick={e => {
          e.preventDefault();
          if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
          }
        }}
      >
        <img src="/img/icons/arrow_right.svg" alt="" />
      </button>
    </div>
  );
};
