import { FC } from 'react';

import styles from './pagination.module.scss';
import { scrollToTop } from '@utils/helpers/scrollToTop';

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

  const onCLick = (data: number) => {
    handlePagination(data);
    scrollToTop();
  };

  return (
    <div className={styles.pagination}>
      {paginationNumbers.map(data => (
        <button
          key={data}
          onClick={() => onCLick(data)}
          className={currentPage === data ? styles.active : ''}
        >
          {data}
        </button>
      ))}
    </div>
  );
};
