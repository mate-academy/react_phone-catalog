import React from 'react';
import styles from './Pagination.module.scss';
import { icons } from '../../constants/icons';
import { Icon } from '../Icon/Icon';
import classNames from 'classnames';

type Props = {
  totalItems: number;
  itemsPerPage: number;
  currPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  totalItems,
  itemsPerPage,
  currPage,
  onPageChange,
}) => {
  const maxVisible = 5;

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  let startPage = Math.max(1, currPage - Math.floor(maxVisible / 2));
  let endPage = startPage + maxVisible - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  return (
    <div className={styles.pagination}>
      <button
        className={classNames(styles.pagination__button, {
          [styles['pagination__button--disabled']]: currPage === 1,
        })}
        disabled={currPage === 1}
        onClick={() => onPageChange(currPage - 1)}
      >
        {currPage === 1 ? (
          <Icon icon={icons.arrow_left__disabled} />
        ) : (
          <Icon icon={icons.arrow_left} />
        )}
      </button>

      <div className={styles.pagination__dots}>
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
          <button
            key={startPage + i}
            className={classNames(styles['pagination__dots-button'], {
              [styles['pagination__dots-button--active']]:
                currPage === startPage + i,
            })}
            onClick={() => onPageChange(startPage + i)}
          >
            {startPage + i}
          </button>
        ))}
      </div>

      <button
        className={classNames(styles.pagination__button, {
          [styles['pagination__button--disabled']]: currPage === totalPages,
        })}
        disabled={currPage === totalPages}
        onClick={() => onPageChange(currPage + 1)}
      >
        {currPage === totalPages ? (
          <Icon icon={icons.arrow_right__disabled} />
        ) : (
          <Icon icon={icons.arrow_right} />
        )}
      </button>
    </div>
  );
};
