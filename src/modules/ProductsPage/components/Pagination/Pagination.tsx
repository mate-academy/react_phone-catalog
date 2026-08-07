import React from 'react';
import styles from './Pagination.module.scss';
import stylesBtn from '@shared/components/ArrowButton/ArrowBtn.module.scss';
import { ArrowButton } from '@shared/components/ArrowButton';
import classNames from 'classnames';
import { getPageNumbers } from './getPageNumbers';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
  onNext,
  onPrev,
  isFirst,
  isLast,
}) => {
  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <div className={styles.pagination}>
      <ArrowButton
        direction="prev"
        onClick={onPrev}
        disabled={isFirst}
        className={classNames(stylesBtn.mobileArrow)}
      />

      <div className={styles.paginationList}>
        {pages.map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={classNames(styles.paginationButton, {
              [styles.isActive]: page === currentPage,
            })}
          >
            {page}
          </button>
        ))}
      </div>

      <ArrowButton
        direction="next"
        onClick={onNext}
        disabled={isLast}
        className={classNames(stylesBtn.mobileArrow)}
      />
    </div>
  );
};
