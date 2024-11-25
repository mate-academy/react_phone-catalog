/* eslint-disable max-len */
import styles from './Pagination.module.scss';
import classNames from 'classnames';
import { usePagination, DOTS } from '../../hooks/usePagination';
import React from 'react';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/getSearchWith';

interface Props {
  totalCount: number;
  currentPage: number;
}

export const Pagination: React.FC<Props> = ({ totalCount, currentPage }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const itemsPerPage =
    searchParams.get('perPage') === 'all'
      ? totalCount
      : +(searchParams.get('perPage') || 4);

  const paginationRange = usePagination({
    totalCount,
    currentPage,
    itemsPerPage,
  });

  if (!paginationRange || !paginationRange?.includes(currentPage)) {
    return <Navigate to="./" />;
  }

  const lastPage = paginationRange[paginationRange.length - 1];

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const setSearchWith = (obj: object) => {
    const search = getSearchWith(obj, searchParams);

    setSearchParams(search);
  };

  const handlePrev = () => {
    setSearchWith({ page: `${currentPage - 1}` });
  };

  const handleNext = () => {
    setSearchWith({ page: `${currentPage + 1}` });
  };

  return (
    <div className={styles.paginationContainer}>
      <button
        className={classNames(styles.btn, styles.btnPrev)}
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10.4715 3.52861C10.2111 3.26826 9.78903 3.26826 9.52868 3.52861L5.52868 7.52861C5.26833 7.78896 5.26833 8.21107 5.52868 8.47141L9.52868 12.4714C9.78903 12.7318 10.2111 12.7318 10.4715 12.4714C10.7318 12.2111 10.7318 11.789 10.4715 11.5286L6.94289 8.00001L10.4715 4.47141C10.7318 4.21107 10.7318 3.78896 10.4715 3.52861Z" />
        </svg>
      </button>
      <ul className={styles.productsPages}>
        {paginationRange.map((page, index) => {
          return (
            <li key={`${page}${index}`}>
              <Link
                to={{
                  search: getSearchWith({ page }, searchParams),
                }}
                className={classNames(styles.productsPage, {
                  [styles.productsPageDots]: page === DOTS,
                  [styles.productsPageIsActive]: page === currentPage,
                })}
              >
                {page}
              </Link>
            </li>
          );
        })}
      </ul>
      <button
        className={classNames(styles.btn, styles.btnNext)}
        onClick={handleNext}
        disabled={currentPage === lastPage}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5.52876 3.52861C5.78911 3.26826 6.21122 3.26826 6.47157 3.52861L10.4716 7.52861C10.7319 7.78896 10.7319 8.21107 10.4716 8.47141L6.47157 12.4714C6.21122 12.7318 5.78911 12.7318 5.52876 12.4714C5.26841 12.2111 5.26841 11.789 5.52876 11.5286L9.05735 8.00001L5.52876 4.47141C5.26841 4.21107 5.26841 3.78896 5.52876 3.52861Z" />
        </svg>
      </button>
    </div>
  );
};
