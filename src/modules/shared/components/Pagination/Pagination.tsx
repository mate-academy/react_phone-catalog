import React from 'react';
import classNames from 'classnames';
import styles from './Pagination.module.scss';
import { ArrowUpIcon } from '../Icons';

interface Props {
  total: number;
  current: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  current,
  onPageChange,
}) => {
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <ul className={styles.pagination}>
      <li className={styles.item}>
        <button
          className={classNames(styles.button, styles.arrow, {
            [styles.disabled]: current === 1,
          })}
          onClick={() => onPageChange(current - 1)}
          disabled={current === 1}
        >
          <span className="icon icon--left">
            <ArrowUpIcon />
          </span>
        </button>
      </li>

      {pages.map(page => (
        <li key={page} className={styles.item}>
          <button
            className={classNames(styles.button, {
              [styles.active]: page === current,
            })}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        </li>
      ))}

      <li className={styles.item}>
        <button
          className={classNames(styles.button, styles.arrow, {
            [styles.disabled]: current === total,
          })}
          onClick={() => onPageChange(current + 1)}
          disabled={current === total}
        >
          <span className="icon icon--right">
            <ArrowUpIcon />
          </span>
        </button>
      </li>
    </ul>
  );
};
