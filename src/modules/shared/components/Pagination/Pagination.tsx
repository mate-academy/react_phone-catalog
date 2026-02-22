import React from 'react';
import styles from './Pagination.module.scss';
import classNames from 'classnames';
import ArrowNav from '../../icons/ArrowNav';
import { Direction } from '../../icons/ArrowNav/ArrowNav';

type Props = {
  perPage: number;
  currentPage: number;
  totalItems: number;
  setPage: (value: number) => void;
};

export const Pagination: React.FC<Props> = ({
  perPage,
  currentPage,
  totalItems,
  setPage,
}) => {
  const totalPages = Math.ceil(totalItems / perPage) || 1;
  const numbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
      <div className={styles.pagination}>
        <span onClick={() => setPage(currentPage - 1)}>
          <ArrowNav
            disabled={currentPage === 1}
            classname="pagination__arrow"
            direction={Direction.Left}
          />
        </span>
        <div className={styles.wrapper}>
          {numbers.map(number => (
            <div
              key={number}
              className={classNames(styles.pageNumber, {
                [styles['pageNumber--active']]: number === currentPage,
              })}
              onClick={() => setPage(number)}
            >
              {number}
            </div>
          ))}
        </div>
        <span onClick={() => setPage(currentPage + 1)}>
          <ArrowNav
            disabled={currentPage === totalPages}
            classname="pagination__arrow"
            direction={Direction.Right}
          />
        </span>
      </div>
    </>
  );
};

export default Pagination;
