/* eslint-disable max-len */
import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../modules/shared/utils/getNumbers';
import styles from './Pagination.module.scss';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (val: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pages = getNumbers(1, Math.ceil(total / perPage));

  const handlePrev = () => {
    if (currentPage === 1) {
      return;
    }

    scrollTo(0, 0);
    onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage === pages.length) {
      return;
    }

    scrollTo(0, 0);
    onPageChange(currentPage + 1);
  };

  return (
    <ul className={styles.pagination}>
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <button
          className={styles.button}
          aria-disabled={currentPage === 1}
          onClick={handlePrev}
        >
          <svg
            width="6"
            height="10"
            viewBox="0 0 6 10"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              transform: `rotate(180deg)`,
              transformOrigin: 'center center',
            }}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d=" M0.528758 0.528606 C0.789108 0.268256 1.21122 0.268256 1.47157 0.528606 L5.47157 4.52861 C5.73192 4.78896 5.73192 5.21107 5.47157 5.47141 L1.47157 9.47141 C1.21122 9.73176 0.789108 9.73176 0.528758 9.47141 C0.268409 9.21107 0.268409 8.78896 0.528758 8.52861 L4.05735 5.00001 L0.528758 1.47141 C0.268409 1.21107 0.268409 0.788955 0.528758 0.528606Z"
            ></path>
          </svg>
        </button>
      </li>
      {pages.map(num => (
        <li key={num}>
          <button
            className={cn(`${styles.button}`, {
              [styles.button__active]: currentPage === num,
            })}
            //href={`#${num}`}
            onClick={() => onPageChange(num)}
          >
            {num}
          </button>
        </li>
      ))}
      <li
        className={cn('page-item', { disabled: currentPage === pages.length })}
      >
        <button
          className={styles.button}
          aria-disabled={currentPage === pages.length}
          onClick={handleNext}
        >
          <svg
            width="6"
            height="10"
            viewBox="0 0 6 10"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              transform: `rotate(0deg)`,
              transformOrigin: 'center center',
            }}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d=" M0.528758 0.528606 C0.789108 0.268256 1.21122 0.268256 1.47157 0.528606 L5.47157 4.52861 C5.73192 4.78896 5.73192 5.21107 5.47157 5.47141 L1.47157 9.47141 C1.21122 9.73176 0.789108 9.73176 0.528758 9.47141 C0.268409 9.21107 0.268409 8.78896 0.528758 8.52861 L4.05735 5.00001 L0.528758 1.47141 C0.268409 1.21107 0.268409 0.788955 0.528758 0.528606Z"
            ></path>
          </svg>
        </button>
      </li>
    </ul>
  );
};
