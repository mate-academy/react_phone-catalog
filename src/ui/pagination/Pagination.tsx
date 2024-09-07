import { FC } from 'react';

import styles from './pagination.module.scss';

type TProps = {
  itemPerPage: number;
  length: number;
  currentPage: number;
  handlePagination: (data: number) => void;
};

export const Pagination: FC<TProps> = ({
  itemPerPage,
  length,
  currentPage,
  handlePagination,
}) => {
  const paginationNumbers = [];

  for (let i = 1; i <= Math.ceil(length / itemPerPage); i++) {
    paginationNumbers.push(i);
  }

  return (
    <div className={styles.pagination}>
      {paginationNumbers.map(data => (
        <button
          key={data}
          onClick={() => handlePagination(data)}
          className={currentPage === data ? styles.active : ''}
        >
          {data}
        </button>
      ))}
    </div>
  );
};
