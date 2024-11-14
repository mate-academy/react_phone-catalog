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
      ></button>
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
      ></button>
    </div>
  );
};
